import React, { useState, useEffect } from 'react';
import { Button, Tabs, Tab, Form, Alert, Modal, Pagination } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import UserForm from './componente/UserForm';
import UserTable from './componente/UserTable';
import '../../App.css';
import { FetchUser, NewUser, createDataObjectUser, deleteUserByID, editUser } from '../../services/functions/RequestPeople';

const UserManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pessoas, setPessoas] = useState([]);
  const [userValues, setUserValues] = useState({
    id: '',
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    cpf: '',
    telefone: '',
    usertype: '',
    endereco: {
      id: 0,
      cep: '',
      cidade: '',
      estado: '',
      bairro: '',
      numero: '',
    },
    role: '',
    password: '',
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const columns = [ 'Nome', 'Sobrenome', 'Email',  'CPF','Telefone',  'Role'];

  const getRoleName = (userType) => {
    switch (userType) {
      case 'Cliente':
        return 1;
      case 'Admin':
        return 2;
      case 'Vendedor':
        return 3;
      case 'Caixa':
        return 4;
      default:
        return userType;
    }
  };

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

  const handleShowModal = () => {
    setUserValues({
      id: '',
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
      password: '',
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleEdtUser = async () => {
      const dataObject = {
        id: userValues.id.toString() ?? 0,
        nome: userValues.nome.toString() ?? '',
        sobrenome: userValues.sobrenome.toString() ?? '',
        dtNascimento: userValues.dataNascimento.toString() ?? '',
        email: userValues.email.toString() ?? '',
        cpf: userValues.cpf.toString() ?? '',
        phone: userValues.telefone.toString() ?? '',
        userType: parseInt(getRoleName(userValues.role)) ?? parseInt(0),
        address: {
          id: parseInt(0),
          zipCode: userValues.endereco.cep.toString() ?? '',
          cityName: userValues.endereco.cidade.toString() ?? '',
          state: userValues.endereco.estado.toString() ?? '',
          road: userValues.endereco.bairro.toString() ?? '',
          number: parseInt(userValues.endereco.numero) || 0,
        },
        roleIds: ["3fa85f64-5717-4562-b3fc-2c963f66afa6"],
        password: userValues.password.toString() ?? ''
      };
      await editUser(dataObject);
      await updateUsers();
    handleCloseModal();
  };

  const handleAddUser = async () => {
    handleCloseModal();
    const newDataUser = await createDataObjectUser(userValues);
    await NewUser(newDataUser);
    await updateUsers();
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handleEditUser = async (userData) => {
    console.log(userData)
    setUserValues({
      id: userData.id ?? '',
      nome: userData.nome ?? '',
      sobrenome: userData.sobrenome ?? '',
      email: userData.email ?? '',
      dataNascimento: userData.dataNascimento ?? '',
      cpf: userData.cpf ?? '',
      telefone: userData.telefone ?? '',
      endereco: {
        id: 0,
        cep: userData.endereco?.cep ?? '',
        cidade: userData.endereco?.cidade ?? '',
        estado: userData.endereco?.estado ?? '',
        bairro: userData.endereco?.bairro ?? '',
        numero: userData.endereco?.numero ?? '',
      },
      role: userData.role ?? '1',
      password: userData.password,
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteUser = async () => {
    setShowDeleteModal(false);
    if (userToDelete) {
      await deleteUserByID(userToDelete.id);
      await updateUsers();
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      console.error('Objeto de usuário inválido:', userToDelete);
    }
  };

  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = async () => {
    try {
      const data = await FetchUser();

      if (data && Array.isArray(data)) {
        const users = data.map((user) => { 
          return {
            id: user.id,
            nome: user.nome,
            sobrenome: user.sobrenome,
            email: user.email,
            dataNascimento: user.dtNascimento,
            cpf: user.cpf,
            telefone: user.phone,
            role: user.userType,
            passwordHash: user.passwordHash
          };
        });

        setPessoas(users);
      } else {
        console.error('Dados recebidos não são válidos:', data);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getCurrentItems = () => {
    const filteredPessoas = pessoas.filter((pessoa) =>
      pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredPessoas.slice(indexOfFirstItem, indexOfLastItem);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    const totalItems = pessoas.filter((pessoa) =>
      pessoa.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }

    return <Pagination>{pageNumbers}</Pagination>;
  };

  return (
    <Card>
      <div className="card-header">Gerenciamento de Usuários</div>
      <div className="card-body">
        <Button variant="primary" onClick={handleShowModal}>
          Cadastrar Pessoa
        </Button>
        <ModalComponent show={showModal} onHide={handleCloseModal} title={isEditMode ? "Editar Pessoa" : "Cadastrar Pessoa"} hideButtons="true">
          <UserForm
            userValues={userValues}
            handleInputChange={handleInputChange}
            handleClose={handleCloseModal}
            save={handleAddUser}
            edit={handleEdtUser}
            isEditMode={isEditMode}
          />
        </ModalComponent>

        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Buscar pessoa por nome"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Form.Group>

        {showSuccessMessage && (
          <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
            Usuário excluído com sucesso!
          </Alert>
        )}

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmação de Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza de que deseja excluir o usuário {userToDelete && `${userToDelete.nome} ${userToDelete.sobrenome}`}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteUser}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Usuário cadastrado com sucesso!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <Tabs defaultActiveKey="clientes" id="user-tabs" className="mt-3">
          <Tab eventKey="clientes" title="Clientes">
            <UserTable
              users={getCurrentItems()}
              columns={columns}
              onEdit={handleEditUser}
              onDelete={handleShowDeleteModal}
            />
            {renderPagination()}
          </Tab>
        </Tabs>
      </div>
    </Card>
  );
};

export default UserManager;
