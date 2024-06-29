import axios from 'axios';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button, Tabs, Tab, Form } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import UserForm from './componente/UserForm';
import UserTable from './componente/UserTable';
import '../../App.css';
import { FetchUser, NewUser, createDataObjectUser } from '../../services/functions/RequestPeople';

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
  const [editingUserId, setEditingUserId] = useState(null); // Estado para armazenar o ID do usuário sendo editado

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
      role: '',
      password: '',  // Certifique-se de que a senha também seja limpa
    });
    setEditingUserId(null); // Limpar o ID do usuário sendo editado ao fechar o modal
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSaveUser = async () => {
    await createDataObjectUser(userValues).
    then( data=>{NewUser(data)});
    await UpdatePessoas();  // Recarregar a lista de pessoas
    handleCloseModal();
  };

  const handleEditUser = async (userId, userData) => {
    // Define os dados do usuário selecionado no estado `userValues`
    setUserValues({
      nome: userData.nome ?? '',
      sobrenome: userData.sobrenome ?? '',
      email: userData.email ?? '',
      dataNascimento: userData.dataNascimento ?? '',
      cpf: userData.cpf ?? '',
      telefone: userData.telefone ?? '',
      endereco: {
        cep: userData.endereco?.cep ?? '',
        cidade: userData.endereco?.cidade ?? '',
        estado: userData.endereco?.estado ?? '',
        bairro: userData.endereco?.bairro ?? '',
        numero: userData.endereco?.numero ?? '',
      },
      role: userData.role ?? 'cliente', // Define 'cliente' como padrão se o papel não estiver definido
      password: '', // Mantém a senha vazia para edição
    });
    // Define o ID do usuário sendo editado
    //setEditingUserId(userId);
  
    // Abre o modal de edição
    handleShowModal();
  };

  const handleDeleteUser = async (userId) => {
    // Chamada ao serviço para excluir o usuário
    await UpdatePessoas();  // Recarregar a lista de pessoas
  };

  const getRole = (roleNumber) => {
    return roleNumber === 1 ? 'adm' :
           roleNumber === 2 ? 'cliente' :
           roleNumber === 3 ? 'caixa' :
           roleNumber === 4 ? 'vendedor' :
           'Role não reconhecido';
  };

  const UpdatePessoas = async () => {
    try {
      const data = await FetchUser();

      if (data && Array.isArray(data)) {
        const users = data.map(user => ({
          id: user.id, // Adicione o campo ID ou o identificador único do usuário
          nome: user.nome,
          sobrenome: user.sobrenome,
          email: user.email,
          dataNascimento: user.dtNascimento,
          cpf: user.cpf,
          telefone: user.phone,
          role: getRole(user.userType),
        }));
        setPessoas(users);
      } else {
        console.error("Dados recebidos não são válidos:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    UpdatePessoas();  // Chamada para buscar usuários ao montar o componente
  }, []);

  const clientes = pessoas.filter(pessoa => pessoa.role === 'cliente' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));
  const vendedores = pessoas.filter(pessoa => pessoa.role === 'vendedor' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));
  const caixas = pessoas.filter(pessoa => pessoa.role === 'caixa' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));
  const administradores = pessoas.filter(pessoa => pessoa.role === 'adm' && pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase()));

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
              onEdit={handleEditUser} // Passar a função de edição para a tabela
              onDelete={handleDeleteUser} // Passar a função de exclusão para a tabela
            />
          </Tab>
          <Tab eventKey="vendedores" title="Vendedores">
            <UserTable
              users={vendedores}
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone']}
              onEdit={handleEditUser} // Passar a função de edição para a tabela
              onDelete={handleDeleteUser} // Passar a função de exclusão para a tabela
            />
          </Tab>
          <Tab eventKey="caixas" title="Caixas">
            <UserTable
              users={caixas}
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone']}
              onEdit={handleEditUser} // Passar a função de edição para a tabela
              onDelete={handleDeleteUser} // Passar a função de exclusão para a tabela
            />
          </Tab>
          <Tab eventKey="administradores" title="Administradores">
            <UserTable
              users={administradores}
              columns={['#', 'Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'CPF', 'Telefone', 'Role']}
              onEdit={handleEditUser} // Passar a função de edição para a tabela
              onDelete={handleDeleteUser} // Passar a função de exclusão para a tabela
            />
          </Tab>
        </Tabs>
      </div>
    </Card>
  );
};

export default UserManager;
