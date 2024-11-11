import React, { useEffect, useRef } from 'react';
import  Quagga from'quagga';


const BarcodeScanner = ({ onDetected, active }) => {
  const videoRef = useRef(null);

  const startScanner = () => {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: videoRef.current,
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment'
        },
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader']
      }
    }, (err) => {
      if (err) {
        console.error('Erro ao iniciar o Quagga:', err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      onDetected(data.codeResult.code);
      stopScanner();  // Desliga o scanner ao detectar o código
    });
  };

  const stopScanner = () => {
    Quagga.stop();
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    let timeout;

    if (active) {
      startScanner();
      // Inicia o temporizador de 10 segundos para desligar a câmera automaticamente
      
    } else {
      stopScanner();
    }

    return () => {
      stopScanner(); // Garante que o scanner seja desligado ao desmontar o componente
   
    };
  }, [active]); // Dependência em "active"

  return <div ref={videoRef} style={{ width: '100%', height: '100%' }} />;
};

export default BarcodeScanner;



