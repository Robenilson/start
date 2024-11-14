import React, { useState, useEffect, useCallback } from 'react';

const GenericForm = ({ fields, values, handleSave, handleChange, mode, handleUpdate, handleClose }) => {
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
    <form className="generic-form">
      {fields.map((field, index) => (
        <div className="form-group" key={index}>
          <label className="form-label">{field.label}</label>
          {field.type === 'select' ? (
            <select
              className="form-control"
              value={values[field.name]}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
            >
              {field.options.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === 'checkbox' ? (
            field.options.map((option, idx) => (
              <div className="form-check" key={idx}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={option.value}
                  checked={values[field.name] === option.value}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  name={field.name}
                />
                <label className="form-check-label">
                  {option.label}
                </label>
              </div>
            ))
          ) : (
            <input
              className="form-control"
              type={field.type}
              value={values[field.name]}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              step={field.step}
              inputMode={field.type === 'number' ? 'decimal' : undefined}
            />
          )}
        </div>
      ))}

      <div className="modal-footer">
        <button type="button" className="btn secondary-btn" onClick={handleClose}>
          Fechar
        </button>

        {isEditMode ? (
          <button type="button" className="btn primary-btn" onClick={handleUpdate} disabled={!isFormValid}>
            Confirmar Edição
          </button>
        ) : (
          <button
              type="button"
              className="btn primary-btn save-btn" // Adicionando a classe save-btn
              onClick={handleSave}
              disabled={!isFormValid} // Mantendo a funcionalidade de desabilitar quando o formulário não for válido
          >
          Salvar
</button>
        )}
      </div>
    </form>
  );
};

export default GenericForm;