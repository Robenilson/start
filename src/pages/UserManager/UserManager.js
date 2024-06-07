import axios from 'axios';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button, Tabs, Tab, Form } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import UserForm from './componente/UserForm';
import UserTable from './componente/UserTable';
import '../../App.css';

const UserContext = createContext();

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
    password: '',  // Novo campo de senha
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
      password: '',  // Certifique-se de que a senha também seja limpa
    });
  };

  const handleSaveUser = async () => {
    const data = {
      nome: userValues.nome,
      sobrenome: userValues.sobrenome,
      dataNascimento: userValues.dataNascimento,
      email: userValues.email,
      cpf: userValues.cpf,
      telefone: userValues.telefone,
      role: userValues.role,
      endereco: {
        cep: userValues.endereco.cep,
        cidade: userValues.endereco.cidade,
        estado: userValues.endereco.estado,
        bairro: userValues.endereco.bairro,
        numero: userValues.endereco.numero,
      },
      password: userValues.password,
    };

    const novoUser = async (data) => {
      try {
        await axios.post('http://localhost:8080/User', data);
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      }
    };

    await novoUser(data);  // Chamada ao serviço para salvar o novo usuário
    fetchPessoas();  // Recarregar a lista de pessoas
    handleCloseModal();
  };

  const handleEditUser = async (userId, updatedValues) => {
    // Chamada ao serviço para editar o usuário
    fetchPessoas();  // Recarregar a lista de pessoas
  };

  const handleDeleteUser = async (userId) => {
    // Chamada ao serviço para excluir o usuário
    fetchPessoas();  // Recarregar a lista de pessoas
  };

  const fetchPessoas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/User');
      setPessoas(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    fetchPessoas();  // Chamada para buscar usuários ao montar o componente
  }, []);

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
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone']} 
            />
          </Tab>
          <Tab eventKey="vendedores" title="Vendedores">
            <UserTable 
              users={vendedores} 
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone']} 
            />
          </Tab>
          <Tab eventKey="caixas" title="Caixas">
            <UserTable 
              users={caixas} 
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone']} 
            />
          </Tab>
          <Tab eventKey="administradores" title="Administradores">
            <UserTable 
              users={administradores} 
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone',  'Role']} 
            />
          </Tab>
        </Tabs>
      </div>
    </Card>
  );
};

export default UserManager;
