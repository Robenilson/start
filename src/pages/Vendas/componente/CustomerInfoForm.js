// src/components/CustomerInfoForm.js

import React from 'react';

const CustomerInfoForm = ({ cpf, setCpf, nomeUsuario, handleValidateUser }) => {
  return (
    <div className="form-group">
      <center>
        <label>Cpf do Cliente</label>
        <input
          type="text"
          value={cpf || ''}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Cpf do Cliente"
          disabled={!!nomeUsuario}
          className="form-control"
        />
        <button 
          type='button' 
          onClick={handleValidateUser} 
          disabled={!!nomeUsuario} 
          className="btn primary-btn"
        >
          Validar Usuário
        </button>
      </center>
      {nomeUsuario && (
        <div className="form-group mt-3">
          <label>Nome do Cliente</label>
          <input
            type="text"
            value={nomeUsuario}
            readOnly
            className="form-control"
          />
        </div>
      )}
    </div>
  );
};

export default CustomerInfoForm;
