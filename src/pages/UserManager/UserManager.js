import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet'; // Corrigido o nome do import
import UserForm from './componente/UserForm';
import Tabela from '../../components/GenericTabel'; // Substituição de UserTable por Tabela
import { FetchUser, NewUser, createDataObjectUser, deleteUserByID, editUser, createUpdatedDataObjectUser } from '../../services/functions/RequestPeople';
import LoadingModal from '../../components/LoadingModal';

const UserManager = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pessoas, setPessoas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userValues, setUserValues] = useState({
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showCreditosModal, setShowCreditosModal] = useState(false);

  // Configuração de colunas para o componente Tabela
  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'sobrenome', label: 'Sobrenome' },
    { key: 'email', label: 'Email' },
    { key: 'cpf', label: 'CPF' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'role', label: 'Role' }
  ];

  const actions = [
    {
      label: 'Editar',
      className: 'edit-btn',
      onClick: (user) => handleEditUserData(user),
    },
    {
      label: 'Excluir',
      className: 'delete-btn',
      onClick: (user) => handleShowDeleteModal(user),
    },
  ];

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

  const handleEditUser = async () => {
    const dataObject = await createUpdatedDataObjectUser(userValues);
    handleCloseModal();
    setLoading(true);  
    await editUser(dataObject);
    await updateUsers();
    setLoading(false);
  };

  const handleAddUser = async () => {
    handleCloseModal();
    setLoading(true);
    const newDataUser = await createDataObjectUser(userValues);
    console.log(newDataUser)
    await NewUser(newDataUser);
    await updateUsers();
    setShowSuccessModal(true);
    setLoading(false);
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handleEditUserData = async (userData) => {
    setUserValues({
      id: userData.id ?? '',
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
      role: userData.role ?? '1',
      password: userData.password,
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleDeleteUser = async () => {
    setShowDeleteModal(false);
    setLoading(true);
    if (userToDelete) {
      await deleteUserByID(userToDelete.id);
      await updateUsers();
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      console.error('Objeto de usuário inválido:', userToDelete);
    }
    setLoading(false);
  };

  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
    setShowDeleteModal(false);
  };

  const handleCreditos = () => {
    setShowCreditosModal(true);
  };

  const handleCloseCreditosModal = () => {
    setShowCreditosModal(false);
  };

  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = async () => {
    setLoading(true);
    const result = await FetchUser();
  
    const users = Array.isArray(result) ? result : []; // Garante que users seja um array, mesmo que FetchUser retorne algo inesperado
  
    console.log(users); // Log para verificar o conteúdo de users
  
    // Passa o array de usuários para o estado `pessoas`
    setPessoas(users);
  
    setLoading(false);
  };
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredUsers = pessoas.filter((user) =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) || user.sobrenome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination">
        {pageNumbers.map((number) => (
          <div key={number} className={`page-item ${number === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(number)}>
            {number}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <div className="user-manager-container">
        <center>
          <button type="button" className="btn primary-btn" onClick={handleShowModal}>
            Cadastrar Pessoa
          </button>
        </center>

        <ModalComponent show={showModal} onHide={handleCloseModal} hideButtons="true" title={isEditMode ? "Editar Pessoa" : "Cadastrar Pessoa"}>
          <UserForm userValues={userValues} handleInputChange={handleInputChange} handleClose={handleCloseModal} save={handleAddUser} edit={handleEditUser} isEditMode={isEditMode} />
        </ModalComponent>

        <center>
          <div className="form-group input-pequeno respon">
            <input className="form-control" type="text" placeholder="Pesquisar por nome ou sobrenome" value={searchTerm} onChange={handleSearchChange} />
          </div>
        </center>

        <Tabela columns={columns} data={currentItems} actions={actions} />

        {renderPagination()}
      </div>
      <ModalComponent show={showDeleteModal} onHide={handleCloseDeleteModal} hideButtons="true" title="Excluir Usuário">
        <div className="modal-delete">
          <p>Tem certeza que deseja excluir este usuário?</p>
          <div className="delete-modal-buttons">
            <button type="button" className="btn secondary-btn" onClick={handleCloseDeleteModal}>
              Cancelar
            </button>
            <button type="button" className="btn delete-btn" onClick={handleDeleteUser}>
              Excluir
            </button>
          </div>
        </div>
      </ModalComponent>
      <LoadingModal show={loading} />
    </Card>
  );
};

export default UserManager;
