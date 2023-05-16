import React, { useState }from 'react'
import axios from 'axios';
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button, Panel, InputGroup, Stack, Checkbox, Divider,Input, Schema, toaster, Message} from 'rsuite';
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import 'rsuite/dist/rsuite.min.css';
import {Link} from 'react-router-dom';
import Brand from '../component/Brand';
import { useNavigate } from "react-router-dom";
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore, doc, setDoc } from "firebase/firestore";

const { StringType, Ty } = Schema.Types;


const Field = React.forwardRef((props, ref) => {
  const { name, message, label, accepter, error, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-10`} ref={ref} className={error ? 'has-error' : ''} style={{marginBottom:'0'}}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} errorMessage={error} {...rest} />
    </Form.Group>
  );
});

const SignUp = () => {
    const formRef = React.useRef();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState("disagree");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const functions = getFunctions();
    const [isCodeSent, setIsCodeSent] = useState(false);
     
    const sendVerificationCode = () => {
      // 发送 POST 请求来触发验证码的发送
      axios
        .post('http://127.0.0.1:5000/api/notification/advertise', { email: email })
        .then((response) => {
          // 请求成功，验证码发送成功
          setIsCodeSent(true);
          // 其他处理逻辑...
        })
        .catch((error) => {
          // 请求失败，处理错误
          console.error('Error sending verification code:', error);
          // 其他处理逻辑...
        });
    };
    

    const signUp = (e) => {
      if (!formRef.current.check()) {
        toaster.push(<Message type="error">Please fill it out as required</Message>);
        return;
      } else {
        //todo:sign in
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
          .then((useCredential) => {
            console.log("yes");
          }).catch((error) => {
            console.log(error);
          })
      }
    }
    const [visible, setVisible] = useState(false);

    const model = Schema.Model({
      email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('Please enter your acount email.'),
      password: StringType()
        .addRule((password) => {
          console.log("pass" + password);
        })
        .isRequired('Please enter your password.')
        .minLength(6, 'at least 6 characters.'),
      username: StringType()
        .isRequired('Please enter the username.')
        .minLength(3, 'at least three characters.'),
      verifyPassword: StringType()
        .addRule((value) => {
          console.log("Password: " + password);
          console.log("Verify Password: " + value);
  
          if (value !== password) {
            return false;
          }
  
          return true;
        }, 'The two passwords do not match')
        .isRequired('This field is required.'),
      agree: StringType()
      .isRequired('Please agree')
    })

    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{
          height: '100vh'
        }}
      >
        <Brand style={{ marginBottom: 10 }} />
        <Panel
          header={<h3>Create an Account</h3>}
          bordered
          style={{ background: '#fff', width: 400 }}
        >
          <p>
            <span>Already have an account?</span> <Link to="./SignIn">Sign in here</Link>
          </p>
  
          <Divider>OR</Divider>
  
          <Form fluid model={model} ref={formRef}>
            <Form.Group>
              <Form.ControlLabel>Username</Form.ControlLabel>
              <Field type='text' name="username" value={username} onChange={(value) => setUsername(value)} />
            </Form.Group>
  
            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Field type='text' name="email" value={email} onChange={(value) => setEmail(value)} />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Password</Form.ControlLabel>
              <Field
                value={password}
                type={visible ? 'text' : 'password'}
                autoComplete="off"
                onChange={(value) => setPassword(value)}
                name="password"
              />
            </Form.Group>
  
            <Form.Group>
              <Form.ControlLabel>Confirm Password</Form.ControlLabel>
              <Field name="verifyPassword" type="password" />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Verification Code</Form.ControlLabel>
              <Field
              type="text"
              name="verificationCode"
              value={verificationCode}
              onChange={(value) => setVerificationCode(value)}
              />
              <Button
  appearance="primary"
  onClick={sendVerificationCode}
  disabled={isCodeSent} // 如果验证码已发送，按钮将被禁用
>
  {isCodeSent ? 'Code Sent' : 'Send Verification Code'}
</Button>

              </Form.Group>

  
            <Form.Group>
              <Stack style={{ marginLeft: -10 }}>
                <Field accepter={Checkbox} name="agree" value="agree" onChange={(value) => setAgree(value)}>I Agree</Field>
                <Field accepter={Button} name="terms" appearance="link">Terms and conditions.</Field>
              </Stack>
            </Form.Group>
  
            <Form.Group>
              <Stack spacing={6}>
              <Button appearance="primary" onClick={signUp}>
              </Button>
              </Stack>
            </Form.Group>
          </Form>
        </Panel>
      </Stack>
    )
    }

export default SignUp;