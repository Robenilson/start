import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ show, onHide, title, save, children, customClass, hideButtons }) => (
  <Modal show={show} onHide={onHide} dialogClassName={customClass}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    
  </Modal>
);

ModalComponent.defaultProps = {
  hideButtons: false,
};

export default ModalComponent;
