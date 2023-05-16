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

const data = mockUsers(20);
// const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const Cusnotification = () => {
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

  const handleReview = (id) => {
    console.log(`Review button clicked for service ID: ${id}`);
  };

  const Card = ({ id, name, description, onReview }) => (
    <Panel header={`Order ID: ${id}`} shaded bordered style={{ width: '80%', marginBottom: 16 ,backgroundColor:'#fff'}}>
      <div>Order ID: {id}</div>
      <div>Service name: {name}</div>
      <div>Service Description: {description}</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        color="orange"
        appearance="ghost" block
        onClick={() => onReview(id)}
        style={{width:'50%',marginTop: 16 }}
      >
        Add a Review
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
          onReview={handleOpen}
        />
      ))}
    </PanelGroup>
    </div>
    <Modal open={open} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title>ADD REVIEW</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid onChange={setFormValue} formValue={formValue}>
          <Form.Group controlId="rate">
          <Form.ControlLabel>Rate:</Form.ControlLabel>
          <Form.Control name="rate" accepter={Rate} />
        </Form.Group>
            <Form.Group controlId="textarea-9">
              <Form.ControlLabel>Textarea</Form.ControlLabel>
              <Input as="textarea" rows={3} placeholder="Add review here" name = 'review' />
            </Form.Group>
          </Form>
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

export default Cusnotification;
