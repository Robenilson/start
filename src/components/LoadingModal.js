import React from 'react';
import ModalComponent from './ModalComponet';
import { Spinner } from 'react-bootstrap';

const LoadingModal = ({ show, onHide }) => (
  <ModalComponent
    show={show}
    onHide={onHide}
    title="Carregando" // Título vazio, pois não é necessário neste caso.
    hideButtons={true} // Esconde quaisquer botões do modal.
  >
    <div className="text-center">
      <Spinner animation="border" />
      <div>Carregando...</div>
    </div>
  </ModalComponent>
);
export default LoadingModal;
