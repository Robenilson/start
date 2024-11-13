import React, { useState ,  useEffect  } from 'react';
import Permision from './Permision';
import { Outlet } from 'react-router-dom';
import OptionNav from './optionNav';
import Card from '../components/Card';
import { urls } from "../services/functions/config/urls";
import NotificationBell from './NotificationBell'; // Componente de notificação
import BarcodeScannerComponent from './BarcodeScanner';

function Menu() {
  return (
    <>
      <Card>
        <div className="menu-container">
          <nav className="menu-nav">
            <div>
              <OptionNav url={urls.userDados} name="Home" />
            </div>
            <div id="basic-navbar-nav" className="menu-nav-content">
              <div className="menu-nav-links">
                <Permision userType="tu" />
               {/*<NotificationBell />  */  } 
                

              </div>
            </div>
          </nav>
        </div>
      </Card>
      <div className="menu-modal-body">
        <Outlet />
      </div>
    </>
  );
}

export default Menu;
