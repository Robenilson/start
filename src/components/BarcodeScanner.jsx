import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  const [scannerInitialized, setScannerInitialized] = useState(false);

  const initScanner = async () => {
    return new Promise((resolve, reject) => {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: document.querySelector('#scanner-container'),
            constraints: {
              width: window.innerWidth < 600 ? window.innerWidth - 20 : 600,
              height: window.innerHeight < 400 ? window.innerHeight / 2 : 100,
              facingMode: 'environment', // Câmera traseira
            },
          },
          decoder: {
            readers: ['code_128_reader'],
          },
        },
        (err) => {
          if (err) {
            console.error('Erro ao iniciar o Quagga:', err);
            reject(err);
            return;
          }
          Quagga.start();
          resolve();
        }
      );
    });
  };

  const handleDetected = (data) => {
    // Chamando a função onDetected sempre que um código é escaneado
    onDetected(data.codeResult.code);
  };

  const handleResize = async () => {
    Quagga.stop();
    await initScanner();
  };

  useEffect(() => {
    const initializeScanner = async () => {
      try {
        await initScanner();
        setScannerInitialized(true);
        Quagga.onDetected(handleDetected);
      } catch (error) {
        console.error('Erro ao inicializar o scanner', error);
      }
    };

    initializeScanner();

    window.addEventListener('resize', handleResize);

    return () => {
      Quagga.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id="scanner-container"
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        height: 'auto',
        position: 'relative',
      }}
    />
  );
};

export default BarcodeScanner;
