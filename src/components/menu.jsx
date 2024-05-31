import React from 'react';

import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

import Card from '../components/Card';
function menu(props) {
    return (
      <>
       <Card >
       
       
   
        
       </Card>
      <div className="modal-body">
              {props.children}
          </div>
      
      </>
    


    );
  }
  
  export default menu;