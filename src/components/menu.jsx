import React from 'react';
import { Navbar } from 'react-bootstrap';
import {  Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Permision from './Permision';
import { Outlet } from 'react-router-dom';
import OptionNav from './optionNav';
import Card from '../components/Card';
import  {urls} from"../services/functions/config/urls";

function Menu() {
    return (
      <>
       <Card >
       <div className="card-header  menu ">
            <Navbar  bg="light" expand="lg">
            <Container     >
                    <Navbar.Brand>
                    <OptionNav url= {urls.userDados} name="Home" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto custom-nav"> 
                      <Permision  userType="tu"/>                             
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                        
                </Navbar>
                </div>
       </Card>
      <div className="modal-body">
        <Outlet/>
      </div>
      </>
    );
  }
  
  export default Menu;