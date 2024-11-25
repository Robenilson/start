import React, { useState, useEffect, useCallback } from 'react';
import BarcodeScanner from '../../../components/BarcodeScanner.jsx'; // Importação do scanner

const GenericForm = ({ fields, values, handleSave, handleChange, mode, handleUpdate, handleClose }) => {
  const [isEditMode, setIsEditMode] = useState(mode === 'editar');
  const [isFormValid, setIsFormValid] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState(''); // Estado para armazenar o código de barras

  // Validação do formulário
  const validateForm = useCallback(() => {
    const allFieldsFilled = fields.every((field) => values[field.name] !== '');
    setIsFormValid(allFieldsFilled);
  }, [fields, values]);

  useEffect(() => {
    setIsEditMode(mode === 'editar');
    validateForm();
  }, [mode, values, validateForm]);

  // Função chamada quando o scanner detecta um código
  const handleBarcodeDetected = (code) => {
    handleChange('codigoBarras', code); // Atualiza o campo específico
    setBarcodeValue(code); // Salva o código de barras no estado
    setScannerActive(false); // Desativa o scanner após a leitura
    validateForm(); // Revalida o formulário
  };

  const handleInputChange = (name, value) => {
    handleChange(name, value);
    validateForm();
  };

  return (
    <center>
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

        {/* Botão para ativar o scanner */}
        <button
          type="button"
          className="btn primary-btn"
          onClick={() => setScannerActive(true)}
        >
          {barcodeValue || 'Escanear Código de Barras'} {/* Exibe o código escaneado ou o texto padrão */}
        </button>

        {/* Exibição do scanner quando ativo */}
        {scannerActive && (
          <BarcodeScanner onDetected={handleBarcodeDetected} />
        )}

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
              className="btn primary-btn save-btn"
              onClick={handleSave}
              disabled={!isFormValid}
            >
              Salvar
            </button>
          )}
        </div>
      </form>
    </center>
  );
};

export default GenericForm;
