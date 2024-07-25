import React from 'react';
import { Modal } from 'react-bootstrap';
import SelectableTable from './SelectableTable';

const ConfirmationModal = ({ showModal, setShowModal, saleType, produtos, services, handleItemClick }) => {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Selecione um {saleType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SelectableTable
          data={saleType === 'produto' ? produtos : services}
          saleType={saleType}
          handleItemClick={handleItemClick}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
