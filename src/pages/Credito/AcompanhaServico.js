import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { FetchUserCPF } from '../../services/functions/RequestPeople';
import LoadingModal from '../../components/LoadingModal';
import { ControllServiceStop, ControllServiceGet } from '../../services/functions/RequestControllService';

import ModalPesquisarCPF from './components/ModalPesquisarCPF';
import ServicoTable from './components/ServicoTable';

const AcompanhaServico = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [servicos, setServicos] = useState(() => {
    // Restaurar o estado dos serviços a partir do localStorage
    const savedServicos = localStorage.getItem('servicos');
    return savedServicos ? JSON.parse(savedServicos) : [];
  });
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [selectedServico, setSelectedServico] = useState(null);

  useEffect(() => {
    // Ao carregar a página, calcular o tempo restante
    setServicos((prevServicos) => {
      const updatedServicos = prevServicos.map((servico) => {
        if (servico.ativo) {
          const now = Date.now();
          const elapsedTime = Math.floor((now - servico.startTime) / 1000); // Tempo decorrido em segundos
          const newTime = servico.tempoAlugado - elapsedTime;
          return {
            ...servico,
            tempoAlugado: newTime > 0 ? newTime : 0,
          };
        }
        return servico;
      });
      return updatedServicos;
    });
  }, []);

  const handlePesquisarCPF = async () => {
    setLoading(true);
    const user = await FetchUserCPF(cpf);
    setUsuario(user);
    console.log(user);

    if (user) {
      const service = ControllServiceGet(user.id);
      service.then((data) => {
        const serviçosAtualizados = data.map((item) => ({
          nomeServico: item.serviceName,
          tempoAlugado:  Math.round(item.totalTime * 60 * 100) / 100, // Convertendo tempo para segundos
          orderId: item.orderId,
          productId: item.id,
          is_Active: item.is_Active,
        }));
        setUsuario({ ...user, servicos: serviçosAtualizados });
      })
      .catch((error) => {
        console.error('Error filtering orders:', error);
      });
    }
    setLoading(false);
  };

  const handleIniciarServico = () => {
    if (selectedServico) {
      const now = Date.now(); // Armazena o tempo de início
      const novoServico = {
        nomeUsuario: usuario.nome,
        cpf: usuario.cpf,
        productId: selectedServico.productId,
        nomeServico: selectedServico.nomeServico,
        tempoAlugado: selectedServico.tempoAlugado,
        ativo: true,
        startTime: now, // Hora de início
      };
      const novosServicos = [...servicos, novoServico];
      setServicos(novosServicos);
      setShowModal(false);
      setSelectedServico(null);
      // Salvar os serviços no localStorage
      localStorage.setItem('servicos', JSON.stringify(novosServicos));
    }
  };

  const handlePararServico = (index) => {
    const servicoParaParar = servicos[index];      
    ControllServiceStop(servicoParaParar.productId,Math.floor(servicoParaParar.tempoAlugado / 60));
    const novosServicos = servicos.filter((_, i) => i !== index);
    setServicos(novosServicos);
    // Atualizar o localStorage após parar o serviço
    localStorage.setItem('servicos', JSON.stringify(novosServicos));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setServicos((prevServicos) => {
        const updatedServicos = prevServicos.map((servico) => {
          if (servico.ativo && servico.tempoAlugado > 0) {
            const now = Date.now();
            const elapsedTime = Math.floor((now - servico.startTime) / 1000); // Tempo decorrido em segundos
            const newTime = servico.tempoAlugado - elapsedTime;
            return {
              ...servico,
              tempoAlugado: newTime > 0 ? newTime : 0,
            };
          }
          return servico;
        });
        // Salvar os serviços atualizados no localStorage
        localStorage.setItem('servicos', JSON.stringify(updatedServicos));
        return updatedServicos;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <div className="user-manager-container">
        <LoadingModal show={loading} />
        <div className="card-header">Acompanhar de Serviços</div>
        <div className="card-body">
          <center>
            <button className="btn primary-btn" onClick={() => setShowModal(true)}>
              Iniciar
            </button>
          </center>
          <ModalPesquisarCPF
            showModal={showModal}
            setShowModal={setShowModal}
            cpf={cpf}
            setCpf={setCpf}
            usuario={usuario}
            setUsuario={setUsuario}
            handlePesquisarCPF={handlePesquisarCPF}
            selectedServico={selectedServico}
            setSelectedServico={setSelectedServico}
            handleIniciarServico={handleIniciarServico}
          />
          <ServicoTable
            servicos={servicos}
            handlePararServico={handlePararServico}
            formatTime={formatTime}
          />
        </div>
      </div>
    </Card>
  );
};

export default AcompanhaServico;
