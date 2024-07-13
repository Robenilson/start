import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalComponent = ({ show, onHide, title = 'Default Title', children, customClass, hideButtons = false }) => (
  <Modal show={show} onHide={onHide} dialogClassName={customClass}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
  </Modal>
);

export default ModalComponent;