import React, { useState, useEffect } from 'react';
import { Form, Button,Modal } from 'react-bootstrap';


const GenericForm = ({ fields, values, save,handleChange, mode , }) => {
  const [isEditMode, setIsEditMode] = useState(mode === 'editar');

  useEffect(() => {
    setIsEditMode(mode === 'editar');
  }, [mode]);

  return (
    <Form>
      {fields.map((field, index) => (
        <Form.Group key={index}>
          <Form.Label>{field.label}</Form.Label>
          <Form.Control
            type={field.type}
            value={values[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            step={field.step}
          />
        </Form.Group>
      ))}


      <Modal.Footer>
        <Button variant="secondary" >
          Fechar
        </Button>

        {isEditMode ? (
        <Button type="button" onClick={() => console.log('Editar clicado')}>
          Confirmar Edição
        </Button>
      ) : (
        <Button type="button" onClick={save}>
          Salvar
        </Button>
      )}
        
      </Modal.Footer>

      
    </Form>
  );
};

export default GenericForm;
