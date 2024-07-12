import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const LoadingModal = ({ show }) => (
  <Modal show={show} centered>
    <Modal.Body className="text-center">
      <Spinner animation="border" />
      <div>Carregando...</div>
    </Modal.Body>
  </Modal>
);

export default LoadingModal;
