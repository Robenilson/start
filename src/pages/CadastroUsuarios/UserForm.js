import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import Card from '../../components/Card';
import ModalComponet from '../../components/ModalComponet';
import  Menu  from'../../components/Card';

function CadastroFuncionarios() {

    //Function Modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
 

    //Recuperar dados modal
    const [selectedOption, setSelectedOption ] = useState(' Selecione o tipo do  Usuarios a  ser Cadastrado');


    //Recuperar dados Form
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [cpf, setCpf] = useState('');


    const 
    handleSub = (event) => {
      event.preventDefault(); // Impede o comportamento padrão do formulário de recarregar a página

      // Exibindo os valores dos campos no console
      console.log('Name:', name);
      console.log('Sobrenome:', surname);
      console.log('Email:', email);
      console.log('CpF:', cpf);
      console.log('Senha:', password);
      console.log('Confirmar:', confirmpassword);
      console.log('DataNasimento:', birthdate);
      console.log('Option:', selectedOption );
    };


    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
      };

      const handleSubmit = () => {
        // Aqui você pode fazer o que quiser com o valor selecionado
        setShowModal(false)

      };

    return (  
    
    <Menu>
        <Card>  
                <div className="card-header  text-center">Cadastro</div>
                    <div className="card-body ">  

                    <form >
                       
                        <div className="form-group row text-center">
                       
                        <div className="col-sm-6   mb-3 "  >  

                         <label  htmlFor="email" > Digite o seu Nome: </label>
                          <input className="form-control" type="text" name="name" id="nome"   value={name}  onChange={(e) => setName(e.target.value)}  placeholder="Seu nome"/>                        
                        </div>
                        <div className="col-sm-6 mb-3">
                            
                        <label  htmlFor="sobrenome" > Digite o seu Sobrenome: </label>
                        <input className="form-control" type="text" name="surname" id="surname"   value={surname}      onChange={(e) => setSurname(e.target.value)}  placeholder="Seu Sobrenome"/>
                        </div>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email"     value={email}    onChange={(e) => setEmail(e.target.value)}   placeholder="Seu Email"/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="email">CPF:</label>
                            <input type="email" className="form-control" id="email"     value={cpf}    onChange={(e) => setCpf(e.target.value)}   placeholder="Seu CPF"/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" className="form-control" id="senha"       value={password}     onChange={(e) => setPassword(e.target.value)}   placeholder="Sua Senha"/>
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="confirmpassword">Confirma Senha</label>
                            <input type="password" className="form-control" id="confirmpassword"       value={confirmpassword}    onChange={(e) => setConfirmPassword(e.target.value)}   placeholder="Confirma Senha"/>
                        </div>

                        <div className="form-group  mb-4">
                            <label htmlFor="dataNascimento   mb-4">Data de Nascimento:</label>
                            <input type="date" className="form-control" id="dataNascimento"    value={birthdate}    onChange={(e) => setBirthdate(e.target.value) }   />
                        </div>

                    
                       
                    {/* Será  exibido  dentro  do modal  */}       

                    <div className="form-group row text-center">
                            <label htmlFor="dataNascimento   ">Tipo  do Usuario:</label>
                            <Button  className=" btn btn-light "   onClick={handleShowModal}>{selectedOption }</Button>         

                        </div>

                    <ModalComponet show={showModal} onHide={handleCloseModal}  handleSubmit={handleSubmit}  title="Tipo de Usuaro"     >
                    <form>
                    <div>
                        <div className="form-check" >
                        <label className="form-check-label">
                                <input   className="form-check-input"
                                type="radio" 
                                name="option" 
                                value="cliente" 
                                onChange={handleOptionChange}
                                checked={selectedOption === "cliente"}
                                />
                                Cliente
                            </label>
                        </div>

                        <div className="form-check" >
                        <label className="form-check-label">
                                <input   className="form-check-input"
                                type="radio" 
                                name="option" 
                                value="funcionario" 
                                onChange={handleOptionChange}
                                checked={selectedOption === "funcionario"}
                                />
                                Funcionario
                            </label>
                        </div>
                        <div className="form-check" >
                        <label className="form-check-label">
                                <input   className="form-check-input"
                                type="radio" 
                                name="option" 
                                value="Adnimistrador" 
                                onChange={handleOptionChange}
                                checked={selectedOption === "Adnimistrador"}
                                />
                                Administrador
                            </label>
                        </div>                       
                        </div>                   
                     </form>
                    </ModalComponet>                                                          
                                <div className=" form-group  my-2  mb-4  text-center ">
                                    <button type="submit"   onClick={ handleSub } className="btn btn-primary text-center">Cadastrar</button>
                                </div>             
            </form>
        </div>
 </Card>
 </Menu>
  
    );
};
 

export default CadastroFuncionarios;