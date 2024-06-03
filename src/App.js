import './App.css';
import React from 'react';
import Login from './pages/Login/Login';
import {UserProvider} from  "./services/context/UserContext";
const App = () => {
  return (

  <UserProvider>
    <Login />
  </UserProvider>
     
  );
};


export default App;
