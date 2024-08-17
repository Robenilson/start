import React, { useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import ModalComponent from '../../components/ModalComponet';
import LoadingModal from '../../components/LoadingModal';

const UserManagerModals = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCreditosModal, setShowCreditosModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };
  
  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handlecreditos = () => setShowCreditosModal(true);
  const handleCloseCreditosModal = () => setShowCreditosModal(false);

  return (
    <div className="user-manager-container">
      {/* Button to trigger the main modal */}
      <Button variant="primary" onClick={handleShowModal}>
        Show Main Modal
      </Button>

      {/* Main Modal */}
      <ModalComponent show={showModal} onHide={handleCloseModal} title="Main Modal" hideButtons="true">
        <Modal.Body>
          {/* Content of the main modal */}
        </Modal.Body>
      </ModalComponent>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja excluir o usuário {userToDelete && `${userToDelete.nome} ${userToDelete.sobrenome}`}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => { /* Handle delete logic */ }}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Usuário cadastrado com sucesso!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Credits Distribution Modal */}
      <Modal show={showCreditosModal} onHide={handleCloseCreditosModal}>
        <Modal.Header closeButton>
          <Modal.Title>Distribuição de créditos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Conteúdo do modal de distribuição de créditos */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreditosModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Alert Message */}
      {showSuccessMessage && (
        <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
          Usuário excluído com sucesso!
        </Alert>
      )}

      {/* Loading Modal */}
      <LoadingModal show={false} />
    </div>
  );
};

export default UserManagerModals;
