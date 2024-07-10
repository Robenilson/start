import React, { useState, useEffect, useCallback } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const GenericForm = ({ fields, values, handleSave, handleChange, mode, handleUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(mode === 'editar');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = useCallback(() => {
    const allFieldsFilled = fields.every((field) => values[field.name] !== '');
    setIsFormValid(allFieldsFilled);
  }, [fields, values]);

  useEffect(() => {
    setIsEditMode(mode === 'editar');
    validateForm();
  }, [mode, values, validateForm]);

  const handleInputChange = (name, value) => {
    handleChange(name, value);
    validateForm();
  };

  return (
    <Form>
      {fields.map((field, index) => (
        <Form.Group key={index}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            value={values[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            step={field.step}
          />
        </Form.Group>
      ))}

      <Modal.Footer>
        <Button variant="secondary">
          Fechar
        </Button>

        {isEditMode ? (
          <Button type="button" onClick={handleUpdate} disabled={!isFormValid}>
            Confirmar Edição
          </Button>
        ) : (
          <Button type="button" onClick={handleSave} disabled={!isFormValid}>
            Salvar
          </Button>
        )}
      </Modal.Footer>
    </Form>
  );
};

export default GenericForm;
