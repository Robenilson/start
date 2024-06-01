import './App.css';
import React from 'react';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Vendas from './pages/Vendas/vendas';
import Caixa from './pages/Caixa/caixa';
import NewProduto from './pages/NovoProduto/NewProduto';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';




const App = () => {
  return (

    <Router>
    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/"   exact element={<Login />} />
        <Route path="/caixa"   exact element={<Caixa />} />
        <Route path="/venda"   exact element={<Vendas />} />
        <Route path="/NewProduto"   exact element={<NewProduto />} />
    </Routes>
</Router>
     
  );
};


export default App;
