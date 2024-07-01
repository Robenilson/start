import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Alert } from 'react-bootstrap';
import Card from '../../components/Card';
import { fetchRoles, newRole, updateRole, deleteRole } from '../../services/functions/RequestRoleService';

const RoleManager = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState(''); // Novo estado para a descrição da role
  const [editingRole, setEditingRole] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    try {
      const rolesData = await fetchRoles();
      if (Array.isArray(rolesData)) {
        setRoles(rolesData);
      } else {
        console.error('Os dados de roles não estão em um formato de array:', rolesData);
      }
    } catch (error) {
      console.error('Erro ao buscar roles:', error);
    }
  };

  const handleShowModal = () => {
    setRoleName('');
    setRoleDescription(''); // Limpa a descrição ao abrir o modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRole(null);
  };

  const handleInputChange = (e) => {
    if (e.target.id === 'formRoleName') {
      setRoleName(e.target.value);
    } else if (e.target.id === 'formRoleDescription') { // Atualiza a descrição
      setRoleDescription(e.target.value);
    }
  };

  const handleSaveRole = async () => {
    try {
      if (editingRole) {
        // Lógica para atualizar a role existente
      } else {
        const rolesData = await fetchRoles();
        const totalRoles = Array.isArray(rolesData) ? rolesData.length : 0;
        const newRoleData = {
          name: roleName,
          description: roleDescription, // Passa a descrição para o objeto newRoleData
          permissions: [
            {
              name: roleName,
              description: 'string'
            }
          ],
          group: totalRoles + 1, // Calcula o grupo como quantidade total + 1
          inative: true
        };

        await newRole(newRoleData); // Chama a função newRole com o objeto JSON criado
      }
      getAllRoles(); // Atualiza a lista de roles após salvar
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar role:', error);
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description); // Define a descrição ao editar a role
    setShowModal(true);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRole(roleId);
      getAllRoles(); // Atualiza a lista de roles após deletar
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao excluir role:', error);
    }
  };

  return (
    <Card>
      <div className="card-header">Gerenciamento de Roles</div>
      <div className="card-body">
        <Button variant="primary" onClick={handleShowModal}>Adicionar Role</Button>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome da Role</th>
              {/* <th>Ações</th>*/}
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.id}>
                <td>{index + 1}</td>
                <td>{role.name}</td>

                {/*
                  <td>
                  <Button variant="warning" onClick={() => handleEditRole(role)}>Editar</Button>
                  {' '}
                  <Button variant="danger" onClick={() => handleDeleteRole(role.id)}>Excluir</Button>
                </td>
              */}
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editingRole ? 'Editar Role' : 'Adicionar Nova Role'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formRoleName">
              <Form.Label>Nome da Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome da role"
                value={roleName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formRoleDescription"> {/* Novo campo para a descrição */}
              <Form.Label>Descrição da Role</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Digite a descrição da role"
                value={roleDescription}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
            <Button variant="primary" onClick={handleSaveRole}>
              {editingRole ? 'Salvar Alterações' : 'Adicionar Role'}
            </Button>
          </Modal.Footer>
        </Modal>

        {showSuccess && <Alert variant="success" className="mt-3">Operação realizada com sucesso!</Alert>}
      </div>
    </Card>
  );
};

export default RoleManager;
