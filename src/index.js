import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './components/css/App.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/css/App.css'; // Certifique-se de que o caminho esteja correto


import { GlobalProvider } from './services/context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
        <App/>
    </GlobalProvider>    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
