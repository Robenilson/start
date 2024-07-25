import React from 'react';
import { Alert } from 'react-bootstrap';

const SuccessAlert = ({ showSuccess }) => {
  return (
    showSuccess && (
      <Alert variant="success" className="mt-3">
        Venda realizada com sucesso!
      </Alert>
    )
  );
};

export default SuccessAlert;
