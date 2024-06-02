import Card from '../../components/Card';
import React, { useState } from 'react';
import ModalComponet from '../../components/ModalComponet';
import  Menu  from'../../components/menu';
import { Button } from 'react-bootstrap';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div style={{ backgroundColor: 'white', padding: 20, margin: '100px auto', width: '300px', borderRadius: '8px' }}>
        <button onClick={onClose} style={{ float: 'right' }}>Fechar</button>
        {children}
      </div>
    </div>
  );
};

// Componente ListaFakePedidos
const ListaFakePedidos = () => {
  const pedidos = [
    { id: 1, descricao: 'Pedido 1', valor: 50 },
    { id: 2, descricao: 'Pedido 2', valor: 75 },
    { id: 3, descricao: 'Pedido 3', valor: 150 },
  ];

  return (
    <ul>
      {pedidos.map(pedido => (
        <li key={pedido.id}>{pedido.descricao}: R$ {pedido.valor}</li>
      ))}
    </ul>
  );
};

// Componente principal Caixa
export const Caixa = () => {
  const [valor, setValor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canOpenModal, setCanOpenModal] = useState(false);

 

  const handleChange = (e) => {
    const valorInput = e.target.value;
    setValor(valorInput);

    if (valorInput => 100) {
      setCanOpenModal(true);
    } else {
      setCanOpenModal(false);
    }
  };

  const handleShowModal = () => {
    if (canOpenModal) {
      setIsModalOpen(true);
    } else {
      alert('O valor deve ser maior ou igual a  100 reais para abrir o Caixa .');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
   
      <Card>
      <div className="card-header  text-center">Caixa</div>
       <div className="card-body ">  


       <div className="form-group  text-center row my-2  mb-4">
          <label htmlFor="email">Inicialize o caixa com um valor acima de  R$ 100,00 reais</label>
          </div>
                       
        
        <input 
        className="form-control"
          type="number"
          value={valor}
          onChange={handleChange}
          placeholder="Digite um valor"
        />
        
        <div className="form-group row my-2 mb-4">
          <label htmlFor="dataNascimento">Principais:</label>
          <button className="btn btn-light" onClick={handleShowModal}>Abrir Caixa</button>
        </div>
        {isModalOpen && (
          <>
           <div className="form-group row    my-2  mb-4">
             <Button  className=" btn btn-light "   onClick={handleShowModal}>Escolha opção</Button>         
            <ModalComponet show={handleShowModal} onHide={handleCloseModal}title="Principais Vendas">
               <h2>Pedidos</h2>
            </ModalComponet>
            </div>
          
          </>
       
       
         
      





      
         
        )}
        </div>
      </Card>
    
  );
};

export default Caixa;