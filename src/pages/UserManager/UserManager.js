import React, { useState } from 'react';
import { Button, Tabs, Tab, Form } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponet from '../../components/ModalComponet';
import UserForm from './componente/UserForm';
import UserTable from './componente/UserTable';

const UserManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [pessoas, setPessoas] = useState([]);
  const [userValues, setUserValues] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    telefone: '',
    tipoPessoa: 'cliente',
    role: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setUserValues({
      nome: '',
      sobrenome: '',
      email: '',
      dataNascimento: '',
      cpf: '',
      telefone: '',
      tipoPessoa: 'cliente',
      role: '',
    });
  };

  const handleSaveUser = () => {
    setPessoas([...pessoas, userValues]);
    handleCloseModal();
  };

  const clientes = pessoas.filter(pessoa => pessoa.tipoPessoa === 'cliente' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));
  const funcionarios = pessoas.filter(pessoa => pessoa.tipoPessoa === 'funcionario' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Card>
      <div className="card-header">Gerenciamento de Usuários</div>
      <div className="card-body">
        <Button variant="primary" onClick={handleShowModal}>
          Cadastrar Pessoa
        </Button>
        <ModalComponet show={showModal} onHide={handleCloseModal} title="Cadastrar Pessoa" save={handleSaveUser}>
          <UserForm userValues={userValues} handleInputChange={handleInputChange} />
        </ModalComponet>

        <div className=" m-0 mb-1">
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Buscar pessoa por nome"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>
        </div>


        


        <Tabs defaultActiveKey="clientes" id="user-tabs" className="mt-3">
          <Tab eventKey="clientes" title="Clientes">
            <UserTable 
              users={clientes} 
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone']} 
            />
          </Tab>
          <Tab eventKey="funcionarios" title="Funcionários">
            <UserTable 
              users={funcionarios} 
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone', 'Role']} 
            />
          </Tab>
        </Tabs>
      </div>
    </Card>
  );
};

export default UserManager;

