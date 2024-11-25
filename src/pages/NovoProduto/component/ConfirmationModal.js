import React from 'react';
const ConfirmationModal = ({ show, onHide, onConfirm, title, body }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay" onClick={onHide}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h5>{title}</h5>
          <button className="close-button" onClick={onHide}>×</button>
        </div>
        <div className="modal-body">
          <p>{body}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onHide}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmationModal;
