import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button, Tabs, Tab, Form } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import UserForm from './componente/UserForm';
import UserTable from './componente/UserTable';
import { openDB } from 'idb';

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
    tipoPessoa: 'cliente',
    role: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      const db = await openDB('pessoas-db', 1, {
        upgrade(db) {
          db.createObjectStore('pessoas');
        },
      });
      const tx = db.transaction('pessoas', 'readonly');
      const store = tx.objectStore('pessoas');
      const data = await store.getAll();
      setPessoas(data);
    }
    fetchData();
  }, []);

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

  const handleSaveUser = async () => {
    const db = await openDB('pessoas-db', 1);
    const tx = db.transaction('pessoas', 'readwrite');
    const store = tx.objectStore('pessoas');
    await store.add(userValues);
    await tx.done;
    const data = await store.getAll();
    setPessoas(data);
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
