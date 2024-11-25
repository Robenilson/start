import React from 'react';
import { Alert } from 'react-bootstrap';
const SuccessAlert = ({ show }) => (
  show ? (
    <Alert variant="success" className="mt-3">
      Cadastro concluído com sucesso!
    </Alert>
  ) : null
);
export default SuccessAlert;
