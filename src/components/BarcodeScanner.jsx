import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const initScanner = () => {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: document.querySelector('#scanner-container'),
            constraints: {
              width: 300,
              height: 300,
              facingMode: 'environment', // Usa a câmera traseira
            },
          },
          decoder: {
            readers: [ // Lista completa de leitores suportados
              'code_128_reader',
              'ean_reader',
              'ean_8_reader',
              'code_39_reader',
              'code_39_vin_reader',
              'codabar_reader',
              'upc_reader',
              'upc_e_reader',
              'i2of5_reader',
              '2of5_reader',
              'code_93_reader'
            ],
          },
          locate: true, // Ativa o rastreamento visual para melhor precisão
        },
        (err) => {
          if (err) {
            console.error('Erro ao iniciar o Quagga:', err);
            setError('Não foi possível acessar a câmera. Verifique as permissões do navegador.');
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

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      initScanner();
    } else {
      setError('Seu navegador não suporta acesso à câmera.');
    }

    // Limpa o scanner ao desmontar o componente
    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div>
      {error ? (
        <div style={{ color: 'red', textAlign: 'center', margin: '10px' }}>
          {error}
        </div>
      ) : (
        <div
          id="scanner-container"
          style={{
            width: '100%',
            maxWidth: '300px',
            height: '300px',
            overflow: 'hidden',
            margin: '10px auto',
            border: '2px solid #00eaff',
            borderRadius: '10px',
            position: 'relative',
          }}
        />
      )}
    </div>
  );
};

export default BarcodeScanner;
