import React from 'react';
import { Navbar } from 'react-bootstrap';
import {  Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import OptionNav from'./optionNav';

import Card from '../components/Card';
function menu(props) {
    return (
      <>
       <Card >
       <div className="card-header  ">
            <Navbar  bg="light" expand="lg">
            <Container  >
                    <Navbar.Brand>
                      <OptionNav url="/Home"  name="Home" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto custom-nav">    
                       <OptionNav url="/venda"  name="vendas" />
                              
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                        
                </Navbar>
                </div>
      
       
       
   
        
       </Card>
      <div className="modal-body">
              {props.children}
          </div>
      
      </>
    


    );
  }
  
  export default menu;