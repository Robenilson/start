import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button, Tabs, Tab, Form } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import UserForm from './componente/UserForm';
import UserTable from './componente/UserTable';
import '../../App.css';

// Criando o contexto
const UserContext = createContext();

// Hook para usar o contexto
export const useUserContext = () => useContext(UserContext);

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
    endereco: {
      cep: '',
      cidade: '',
      estado: '',
      bairro: '',
      numero: '',
    },
    role: 'cliente',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('endereco.')) {
      const key = name.split('.')[1];
      setUserValues((prevValues) => ({
        ...prevValues,
        endereco: {
          ...prevValues.endereco,
          [key]: value,
        },
      }));
    } else {
      setUserValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
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
      endereco: {
        cep: '',
        cidade: '',
        estado: '',
        bairro: '',
        numero: '',
      },
      role: 'cliente',
    });
  };

  const handleSaveUser = async () => {
    console.log(userValues)


    setPessoas([...pessoas, userValues]);
    handleCloseModal();
  };

  const clientes = pessoas.filter(pessoa => pessoa.role === 'cliente' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));
  const vendedores = pessoas.filter(pessoa => pessoa.role === 'vendedor' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));
  const caixas = pessoas.filter(pessoa => pessoa.role === 'caixa' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));
  const administradores = pessoas.filter(pessoa => pessoa.role === 'administrador' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));

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
        <ModalComponent show={showModal} onHide={handleCloseModal} title="Cadastrar Pessoa" save={handleSaveUser}>
          <UserForm userValues={userValues} handleInputChange={handleInputChange} />
        </ModalComponent>

        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Buscar pessoa por nome"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>

        <Tabs defaultActiveKey="clientes" id="user-tabs" className="mt-3">
          <Tab eventKey="clientes" title="Clientes">
            <UserTable 
              users={clientes} 
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone', 'Endereço']} 
            />
          </Tab>
          <Tab eventKey="vendedores" title="Vendedores">
            <UserTable 
              users={vendedores} 
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone', 'Endereço']} 
            />
          </Tab>
          <Tab eventKey="caixas" title="Caixas">
            <UserTable 
              users={caixas} 
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone', 'Endereço']} 
            />
          </Tab>
          <Tab eventKey="administradores" title="Administradores">
            <UserTable 
              users={administradores} 
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone', 'Endereço', 'Role']} 
            />
          </Tab>
        </Tabs>
      </div>
    </Card>
  );
};

export default UserManager;
