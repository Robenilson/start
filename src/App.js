import './App.css';
import React from 'react';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Vendas from './pages/Vendas/vendas';
import Caixa from './pages/Caixa/caixa';
import NewProduto from './pages/NovoProduto/NewProduto';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { urls } from "./services/static/js/urls";




const App = () => {
  return (

    <Router>
    <Routes>
        <Route path={urls.homePage} element={<Home />} />
          <Route path={urls.logiPage}  exact element={<Login />} />
          <Route path={urls.caixaPage}    element={<Caixa />} />
        <Route path={urls.vendasPage}    element={<Vendas />} />
        <Route path={urls.NewProdutoPage}    element={<NewProduto />} />
    </Routes>
</Router>
     
  );
};


export default App;
