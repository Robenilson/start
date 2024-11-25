import React, { useState, useEffect } from 'react';
const UserForm = ({ userValues, save, edit, handleInputChange, handleClose, isEditMode }) => {
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const checkFormValidity = () => {
      const { nome, sobrenome, cpf, email, dataNascimento, password } = userValues;
      return nome && sobrenome && cpf && email && dataNascimento && password;
    };
    setIsFormValid(checkFormValidity());
  }, [userValues]);
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };
  return (
    <form>
      <div className="form-row mb-3">
        <div className="form-group col">
          <label htmlFor="formNome">Nome</label>
          <input
            type="text"
            id="formNome"
            name="nome"
            value={userValues.nome || ''}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group col">
          <label htmlFor="formSobrenome">Sobrenome</label>
          <input
            type="text"
            id="formSobrenome"
            name="sobrenome"
            value={userValues.sobrenome || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row mb-3">
        <div className="form-group col">
          <label htmlFor="formEmail">Email</label>
          <input
            type="email"
            id="formEmail"
            name="email"
            value={userValues.email || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group col">
          <label htmlFor="formDataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="formDataNascimento"
            name="dataNascimento"
            value={formatDate(userValues.dataNascimento)}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row mb-3">
        <div className="form-group col">
          <label htmlFor="formCpf">CPF</label>
          <input
            type="text"
            id="formCpf"
            name="cpf"
            value={userValues.cpf || ''}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group col">
          <label htmlFor="formTelefone">Telefone</label>
          <input
            type="text"
            id="formTelefone"
            name="telefone"
            value={userValues.telefone || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row mb-3">
        <div className="form-group">
          <label htmlFor="formPassword">Senha</label>
          <input
            type="password"
            id="formPassword"
            name="password"
            value={userValues.password || ''}
            onChange={handleInputChange}
            placeholder="Digite a senha"
            className="form-control"
          />
        </div>
      </div>
      <h5>Endereço</h5>
      <div className="form-row mb-3">
        <div className="form-group col">
          <label htmlFor="formCep">CEP</label>
          <input
            type="text"
            id="formCep"
            name="endereco.cep"
            value={userValues.endereco?.cep || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group col">
          <label htmlFor="formCidade">Cidade</label>
          <input
            type="text"
            id="formCidade"
            name="endereco.cidade"
            value={userValues.endereco?.cidade || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row mb-3">
        <div className="form-group col">
          <label htmlFor="formEstado">Estado</label>
          <input
            type="text"
            id="formEstado"
            name="endereco.estado"
            value={userValues.endereco?.estado || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group col">
          <label htmlFor="formBairro">Bairro</label>
          <input
            type="text"
            id="formBairro"
            name="endereco.bairro"
            value={userValues.endereco?.bairro || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row mb-3">
        <div className="form-group col">
          <label htmlFor="formNumero">Número</label>
          <input
            type="text"
            id="formNumero"
            name="endereco.numero"
            value={userValues.endereco?.numero || ''}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row mb-3">
        <div className="form-group col">
          <label htmlFor="formRole">Tipo de Usuário</label>
          <select
            id="formRole"
            name="role"
            value={userValues.role || "1"}
            onChange={handleInputChange}
            required
            className="form-control"
          >
            <option value="1">Cliente</option>
            <option value="2">Admin</option>
            <option value="3">Vendedor</option>
            <option value="4">Caixa</option>
          </select>
        </div>
      </div>
      <div className="form-row mt-4">
        <div className="col">
          <button type="button" onClick={handleClose} className="btn btn-secondary">
            Fechar
          </button>
        </div>
        <div className="col text-end">
          {!isEditMode && (
            <button type="button" onClick={save} disabled={!isFormValid} className="btn btn-primary">
              Cadastrar
            </button>
          )}
          {isEditMode && (
            <button type="button" onClick={edit} disabled={!isFormValid} className="btn btn-success">
              Editar
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
export default UserForm;
