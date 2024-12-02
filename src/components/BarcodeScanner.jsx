import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BrowserBarcodeReader } from '@zxing/library';

const BarcodeScanner = ({ onDetected }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserBarcodeReader();
    let scanning = true;

    const scanBarcode = async () => {
      try {
        const video = webcamRef.current.video;
        if (!video) {
          console.error("Câmera não encontrada.");
          return;
        }

        while (scanning) {
          const result = await codeReader.decodeFromVideoElement(video);
          if (result) {
            onDetected(result.text);
            scanning = false;
          }
        }
      } catch (err) {
        console.error('Erro ao escanear:', err.message);
      }
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      scanBarcode();
    } else {
      console.error("O navegador não suporta acesso à câmera.");
    }

    return () => {
      scanning = false;
      codeReader.reset();
    };
  }, [onDetected]);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        mirrored={false}
        width={300}
        height={300}
        onUserMediaError={(e) => {
          console.error("Erro ao acessar a câmera:", e);
        }}
      />
     
    </div>
  );
};

export default BarcodeScanner;
