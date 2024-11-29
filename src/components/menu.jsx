import React, { useState ,  useEffect  } from 'react';
import Permision from './Permision';
import { Outlet } from 'react-router-dom';
import OptionNav from './optionNav';
import Card from '../components/Card';
import { urls } from "../services/functions/config/urls";
import NotificationBell from './NotificationBell'; // Componente de notificação




function Menu() {

  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Card>
      <div className="menu-container">
      <nav className="menu-nav">
  <div className="menu-header">
    {/* Botão Menu no lado esquerdo */}
    <button
      className="menu-toggle-btn"
      onClick={toggleMenu}
      aria-expanded={isMenuOpen}
    >
      ☰ Menu
    </button>

    {/* Sino de notificação no lado direito */}
    <div className="notification-bell">
    <NotificationBell  />

    </div>

   
  </div>

  {/* Menu de navegação */}
  <div className={`menu-nav-content ${isMenuOpen ? "open" : ""}`}>
    <div className="menu-nav-links">
      <div className="dropdown">
        <OptionNav url={urls.userDados} name="Home" />
        <div className="dropdown-content"></div>
      </div>
      <Permision userType="tu" />
      
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
