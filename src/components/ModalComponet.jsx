import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ show, onHide, title, save, children, customClass, hideButtons }) => (
  <Modal show={show} onHide={onHide} dialogClassName={customClass}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    {!hideButtons && (
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
        <Button variant="primary" onClick={save}>
          Salvar
        </Button>
      </Modal.Footer>
    )}
  </Modal>
);

ModalComponent.defaultProps = {
  hideButtons: true,
};

export default ModalComponent;
