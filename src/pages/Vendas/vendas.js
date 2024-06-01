import Card from '../../components/Card';
import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import ModalComponet from '../../components/ModalComponet';
import  Menu  from'../../components/menu';



function Vendas() {
  
const [showModal, setShowModal] = useState(false);
const handleShowModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);


    return (

      <Menu>

       <Card>
          <form >
                <h1 className="  text-center my-2  mb-4" >Vendas</h1>
              <div className="card-header ">Venda-Iniciar-Venda</div>
              <div className="card-body ">

            <div className="form-group row    my-2  mb-4">
                <label htmlFor="dataNascimento  h1">Principais:</label>
                <Button  className=" btn btn-light "   onClick={handleShowModal}>Escolha opção</Button>         
                <ModalComponet show={showModal} onHide={handleCloseModal}title="Principais Vendas"></ModalComponet>
              </div>
              <hr/>


              <div className="form-group row  my-2  mb-4">
                <label htmlFor="dataNascimento   ">Outros:</label>
                <Button  className=" btn btn-light "   onClick={handleShowModal}>Escolha opção</Button>         
                <ModalComponet show={showModal} onHide={handleCloseModal}title="Outros vendas"></ModalComponet>
              </div>
              <hr/>

              <div className="form-group row  my-2  mb-4">
                <label htmlFor="dataNascimento   ">Creditos:</label>
                <Button  className=" btn btn-light "   onClick={handleShowModal}>Escolha opção</Button>         
                <ModalComponet show={showModal} onHide={handleCloseModal}title="Creditos"></ModalComponet>
              </div>
              <hr/>


              <div className="form-group row  my-2  mb-4">
                <label htmlFor="dataNascimento   ">Descontos:</label>
                <Button  className=" btn btn-light "   onClick={handleShowModal}>Escolha opção</Button>         
                <ModalComponet show={showModal} onHide={handleCloseModal}title="Descontos"></ModalComponet>
              </div>

              </div>
          </form>

          <div className=" form-group  my-2  mb-4  text-center ">
            <button type="submit"    className="btn btn-primary text-center">Cadastrar</button>
          </div>
       </Card>
       </Menu>

        
    );
}

export default Vendas;