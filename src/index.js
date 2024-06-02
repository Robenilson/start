import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


//import pages

import Login from './pages/Login/Login';

import UserForm from './pages/CadastroUsuarios/UserForm';
import NewProduto from './pages/NovoProduto/NewProduto';
import Home from './pages/Relatorio/Relatorio';
import Venda from'./pages/Vendas/vendas';
import Caixa from'./pages/Caixa/caixa';











const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
