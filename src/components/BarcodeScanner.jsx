import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/library';

const BarcodeScanner = ({ onDetected }) => {
  const webcamRef = useRef(null);
  let codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    let scanning = true;

    const startScanning = async () => {
      try {
        const video = webcamRef.current.video;
        if (!video) {
          console.error("Câmera não encontrada.");
          return;
        }

        await codeReader.decodeFromVideoDevice(
          getCameraId(), // Função para selecionar a câmera correta
          video,
          (result, error) => {
            if (result && scanning) {
              onDetected(result.text);
              scanning = false; // Parar a leitura após a detecção
            }
            if (error && error.name !== "NotFoundException") {
              console.error("Erro ao escanear:", error.message);
            }
          }
        );
      } catch (err) {
        console.error('Erro ao acessar a câmera:', err.message);
      }
    };

    const getCameraId = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

      if (isMobile) {
        // Tentar encontrar a câmera traseira em dispositivos móveis
        const backCamera = devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('back'));
        return backCamera ? backCamera.deviceId : undefined;
      }
      return undefined; // Câmera padrão em computadores
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      startScanning();
    } else {
      console.error("O navegador não suporta acesso à câmera.");
    }

    return () => {
      scanning = false;
      codeReader.reset(); // Limpar recursos ao desmontar o componente
    };
  }, [onDetected]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '300px',
        height: '300px',
        margin: '10px auto',
        border: '2px solid #00eaff',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Webcam
        ref={webcamRef}
        mirrored={false}
        width="100%"
        height="100%"
        onUserMediaError={(e) => {
          console.error("Erro ao acessar a câmera:", e);
        }}
        style={{ objectFit: 'cover' }} // Garante que o vídeo preencha o contêiner
      />
    </div>
  );
};

export default BarcodeScanner;
