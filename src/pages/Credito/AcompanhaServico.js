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

  const handlePesquisarCPF = async () => {
    setLoading(true);
    const user = await FetchUserCPF(cpf);
    setUsuario(user);
    console.log(user);

    if (user) {
      const service = ControllServiceGet(user.id);
      service.then((data) => {
        // Supondo que 'data' seja uma lista de serviços
        const serviçosAtualizados = data.map((item) => ({
          nomeServico: item.serviceName,
          tempoAlugado: item.totalTime * 3600, // Convertendo tempo para segundos
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
      const novoServico = {
        nomeUsuario: usuario.nome,
        cpf: usuario.cpf,
        productId: selectedServico.productId,
        nomeServico: selectedServico.nomeServico,
        tempoAlugado: selectedServico.tempoAlugado,
        ativo: true,
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
    console.log(servicoParaParar.productId, parseInt(formatTimeToMinutes(formatTime(servicoParaParar.tempoAlugado))));
    ControllServiceStop(servicoParaParar.productId, parseInt(formatTimeToMinutes(formatTime(servicoParaParar.tempoAlugado))));
    const novosServicos = servicos.filter((_, i) => i !== index);
    setServicos(novosServicos);
    // Atualizar o localStorage após parar o serviço
    localStorage.setItem('servicos', JSON.stringify(novosServicos));
  };

  function formatTimeToMinutes(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);
    return totalMinutes;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setServicos((prevServicos) => {
        const updatedServicos = prevServicos.map((servico) =>
          servico.ativo && servico.tempoAlugado > 0
            ? { ...servico, tempoAlugado: servico.tempoAlugado - 1 }
            : servico
        );
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
