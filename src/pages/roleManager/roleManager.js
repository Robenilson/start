import React, { useState, useEffect } from 'react';
import RoleModalContent from './RoleModalContent';
import Card from '../../components/Card';
import ModalComponent from '../../components/ModalComponet';
import { fetchRoles, newRole, updateRole, deleteRole } from '../../services/functions/RequestRoleService';

const RoleManager = ({ userRole }) => {  // Adicionamos a prop userRole
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
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
    setRoleDescription('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRole(null);
  };

  const handleInputChange = (e) => {
    if (e.target.id === 'formRoleName') {
      setRoleName(e.target.value);
    } else if (e.target.id === 'formRoleDescription') {
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
          description: roleDescription,
          permissions: [
            {
              name: roleName,
              description: 'string'
            }
          ],
          group: totalRoles + 1,
          inative: true
        };

        await newRole(newRoleData);
      }
      getAllRoles();
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
    setRoleDescription(role.description);
    setShowModal(true);
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await deleteRole(roleId);
      getAllRoles();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao excluir role:', error);
    }
  };

  // Condicional para verificar se o usuário é admin


  return (
    <Card>
      <div className="user-manager-container">
        <div className="">Gerenciamento de Roles</div>
        <div className="card-body">
          <center>
            <button type='button' className="btn primary-btn" onClick={handleShowModal}>Adicionar Role</button>
          </center>
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome da Role</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role.name}</td>
                    <td>
                      <button type='button' className="action-btn edit-btn" onClick={() => handleEditRole(role)}>Editar</button>
                      {' '}
                      <button type='button' className="action-btn delete-btn" onClick={() => handleDeleteRole(role.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ModalComponent
            show={showModal}
            onHide={handleCloseModal}
            title={editingRole ? 'Editar Role' : 'Adicionar Nova Role'}
            save={handleSaveRole}
          >
            <RoleModalContent
              roleName={roleName}
              roleDescription={roleDescription}
              handleInputChange={handleInputChange}
            />
          </ModalComponent>

          {showSuccess && <div className="success-alert mt-3">Operação realizada com sucesso!</div>}
        </div>
      </div>
    </Card>
  );
};

export default RoleManager;
