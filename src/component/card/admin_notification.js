import React, { useState } from 'react';
import {
  Panel,
  PanelGroup,
  Button,
  Form,
  Input,
  Modal,
  Rate
} from 'rsuite';
import { mockUsers } from '../../data/mock';
import { Mode } from '@mui/icons-material';

const data = mockUsers(20);
// const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const AdminNotification = () => {
    const [open, setOpen] = React.useState(false);
    const [formValue, setFormValue] = React.useState({
      review: ''
    });
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
  
    const Card = ({ id, name, description, rating,onReview }) => (
      <Panel header={`Order ID: ${id}`} shaded bordered bodyFil style={{ width: '80%', marginBottom: 16 ,backgroundColor:'#fff'}}>
        <div>Provider ID: {id}</div>
        <div>Service provider name: {name}</div>
        <div>Service Description: {description}</div>
        <div>Rating: {rating}</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          color="red"
          appearance="primary" block
          onClick={() => onReview(id)}
          style={{width:'50%',marginTop: 16 }}
        >
          REMOVE
        </Button>
        </div>
      </Panel>
    );
  
    return (
      <>
      <div style={{ height: '100vh', overflow: 'auto' }}>
      <PanelGroup style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {data.map(item => (
          <Card
            key={item.id}
            id={item.id}
            name={item.firstName}
            description={item.description}
            rating={item.rating}
            onReview={handleOpen}
          />
        ))}
      </PanelGroup>
      </div>
      <Modal open={open} onClose={handleClose} size="xs">
          <Modal.Header>
            <Modal.Title style={{color:'red'}}>WARN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>Are you sure you want to remove the service?</p>
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="primary">
              Confirm
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

export default AdminNotification;
