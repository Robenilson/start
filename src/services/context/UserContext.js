import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [pessoaArray, setPessoaArray] = useState(() => {
    const savedData = localStorage.getItem('pessoaArray');
    return savedData ? JSON.parse(savedData) : [];
  });

  const [produtoArray, setProdutoArray] = useState(() => {
    const savedData = localStorage.getItem('produtoArray');
    return savedData ? JSON.parse(savedData) : [];
  });

  const [servicoArray, setServicoArray] = useState(() => {
    const savedData = localStorage.getItem('servicoArray');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('pessoaArray', JSON.stringify(pessoaArray));
  }, [pessoaArray]);

  useEffect(() => {
    localStorage.setItem('produtoArray', JSON.stringify(produtoArray));
  }, [produtoArray]);

  useEffect(() => {
    localStorage.setItem('servicoArray', JSON.stringify(servicoArray));
  }, [servicoArray]);

  return (
    <GlobalContext.Provider value={{ 
      pessoaArray, setPessoaArray, 
      produtoArray, setProdutoArray, 
      servicoArray, setServicoArray 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
