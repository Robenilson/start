import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função para identificar se o dispositivo é móvel
    const isMobileDevice = () => /Mobi|Android|iPhone/i.test(navigator.userAgent);

    const initScanner = () => {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: document.querySelector('#scanner-container'),
            constraints: {
              width: 300,
              height: 300,
              facingMode: isMobileDevice() ? 'environment' : 'user', // Muda com base no dispositivo
            },
          },
          decoder: {
            readers: [
              'code_128_reader', // Leitor padrão para códigos de barras comuns
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

      // Callback ao detectar código de barras
      Quagga.onDetected((data) => {
        onDetected(data.codeResult.code);
        Quagga.stop(); // Para o scanner após a detecção
      });
    };

    // Verifica suporte à câmera antes de iniciar
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      initScanner();
    } else {
      setError('Seu navegador não suporta acesso à câmera.');
    }

    // Limpeza ao desmontar o componente
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
