import React from 'react';
import Menu from './components/menu';
import Login from './pages/Login/Login';
import Credito from './pages/Credito/AcompanhaServico';
import Vendas from './pages/Vendas/vendas';
import Caixa from './pages/Caixa/caixa';
import NewProduto from './pages/NovoProduto/NewProduto';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { urls } from "./services/functions/config/urls";
import Userdados from './pages/UserManager/UserManager';
import RoleManager from './pages/roleManager/roleManager';




const App = () => {
  return (

    <Router>
    <Routes>
        <Route path={urls.loginPage}  exact element={<Login />} />
        <Route element={<Menu />}>         
          <Route path={urls.credito} element={<Credito />} />
          <Route path={urls.userDados} element={<Userdados />} />
          <Route path={urls.caixaPage}    element={<Caixa />} />
          <Route path={urls.vendasPage}    element={<Vendas />} />
          <Route path={urls.newProdutoPage}    element={<NewProduto />} /> 
          <Route path={urls.roleManager}    element={<RoleManager />} />   
        </Route>
        
    </Routes>
</Router>
     
  );
};


export default App;
