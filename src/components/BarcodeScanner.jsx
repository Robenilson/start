import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/library';

const BarcodeScanner = ({ onDetected }) => {
  const webcamRef = useRef(null);
  const [cameraId, setCameraId] = useState(null); // Armazena o ID da câmera
  let codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    let scanning = true;

    const getCameraId = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

        if (isMobile) {
          // Encontrar a câmera traseira
          const backCamera = devices.find(
            (device) =>
              device.kind === 'videoinput' && device.label.toLowerCase().includes('back')
          );
          return backCamera ? backCamera.deviceId : undefined;
        }
        return undefined; // Câmera padrão para computadores
      } catch (error) {
        console.error("Erro ao obter dispositivos de mídia:", error);
        return undefined;
      }
    };

    const startScanning = async (deviceId) => {
      try {
        const video = webcamRef.current.video;
        if (!video) {
          console.error("Câmera não encontrada.");
          return;
        }

        await codeReader.decodeFromVideoDevice(
          deviceId,
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
        console.error("Erro ao acessar a câmera:", err.message);
      }
    };

    // Inicializar o processo
    const initializeScanner = async () => {
      const deviceId = await getCameraId();
      setCameraId(deviceId); // Armazena o ID da câmera
      startScanning(deviceId);
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      initializeScanner();
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
