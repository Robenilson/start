import React, { useState ,  useEffect  } from 'react';
import  {FetchBox, ViewDataObjectBox,PutCanceltBox} from'../services/functions/RequestBox';
import Permision from './Permision';
import { Outlet } from 'react-router-dom';
import OptionNav from './optionNav';
import Card from '../components/Card';
import { urls } from "../services/functions/config/urls";
import NotificationBell from './NotificationBell'; // Componente de notificação
import Cart from './Car'; // Importando o novo componente Cart



function Menu() {
  const [cartItems, setCartItems] = useState( []); // Itens de exemplo no carrinho

  useEffect(() => {
    updateBox();
  }, []);

  const updateBox = async () => {
    const boxData = await FetchBox();
    const viewData = await ViewDataObjectBox(boxData);
    setCartItems(viewData);
    
  };

  const cancel = async (value) => {
   await PutCanceltBox(value);
    updateBox()
    
    
  };



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
                <NotificationBell /> {/* Componente de notificação */}
                <Cart cartItems={cartItems}   onCancelItem={cancel} /> {/* Usando o novo componente Cart */}
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
