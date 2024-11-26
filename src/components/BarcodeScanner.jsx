import React, { useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  useEffect(() => {
    const initScanner = () => {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: document.querySelector('#scanner-container'),
            constraints: {
              width: 300, // Defina a largura máxima
              height: 300, // Defina a altura máxima
              facingMode: 'environment', // Usa a câmera traseira
            },
          },
          decoder: {
            readers: ['code_128_reader'], // Tipo de leitor
          },
        },
        (err) => {
          if (err) {
            console.error('Erro ao iniciar o Quagga:', err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected((data) => {
        onDetected(data.codeResult.code);
        Quagga.stop(); // Para o scanner após a detecção
      });
    };

    initScanner();

    // Reinicia o scanner ao redimensionar a janela
    const handleResize = () => {
      Quagga.stop();
      initScanner();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      Quagga.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, [onDetected]);

  return (
    <div
      id="scanner-container"
      style={{
        width: '100%',
        maxWidth: '300px',
        height: '300px',
        overflow: 'hidden', // Impede o vazamento da imagem
        margin: '10px auto',
        border: '2px solid #00eaff',
        borderRadius: '10px',
        position: 'relative',
      }}
    />
  );
};

export default BarcodeScanner;
