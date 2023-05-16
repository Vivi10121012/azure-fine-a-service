import React from 'react';
import {
  Drawer,
  Button,
  Form,
  Input,
} from 'rsuite';

const CusUpdateRe = (props) => {
  const { onClose, ...rest } = props;
  
  return (
    <Drawer backdrop="static" size="sm" placement="right" onClose={onClose} {...rest}>
      <Drawer.Header>
        <Drawer.Title>Demand an Update</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={onClose} appearance="primary">
            Confirm
          </Button>
          <Button onClick={onClose} appearance="subtle">
            Cancel
          </Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <Form fluid>
          <Form.Group>
            <Form.ControlLabel>Update Requirement:</Form.ControlLabel>
            <Input as="textarea" rows={5} placeholder="Update requirement here" name = 'update' />
          </Form.Group>   
        </Form>
      </Drawer.Body>
    </Drawer>
  );
};

export default  CusUpdateRe;