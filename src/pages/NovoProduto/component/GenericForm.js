import React from 'react';
import { Form } from 'react-bootstrap';

const GenericForm = ({ fields, values, handleChange }) => {
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
    </Form>
  );
};

export default GenericForm;
