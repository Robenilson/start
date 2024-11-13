import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { FetchUserCPF } from '../../services/functions/RequestPeople';
import LoadingModal from '../../components/LoadingModal';
import { ControllServiceStop, ControllServiceGet } from '../../services/functions/RequestControllService';

import ModalPesquisarCPF from './components/ModalPesquisarCPF';
import Tabela from '../../components/GenericTabel'; // Substituído ServicoTable por Tabela

const AcompanhaServico = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [servicos, setServicos] = useState(() => {
    const savedServicos = localStorage.getItem('servicos');
    return savedServicos ? JSON.parse(savedServicos) : [];
  });
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [selectedServico, setSelectedServico] = useState(null);

  useEffect(() => {
    setServicos((prevServicos) => {
      const updatedServicos = prevServicos.map((servico) => {
        if (servico.ativo) {
          const now = Date.now();
          const elapsedTime = Math.floor((now - servico.startTime) / 1000); 
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
          tempoAlugado:  Math.round(item.totalTime * 60 * 100) / 100, 
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
      const now = Date.now();
      const novoServico = {
        nomeUsuario: usuario.nome,
        cpf: usuario.cpf,
        productId: selectedServico.productId,
        nomeServico: selectedServico.nomeServico,
        tempoAlugado: selectedServico.tempoAlugado,
        ativo: true,
        startTime: now,
      };
      const novosServicos = [...servicos, novoServico];
      setServicos(novosServicos);
      setShowModal(false);
      setSelectedServico(null);
      localStorage.setItem('servicos', JSON.stringify(novosServicos));
    }
  };

  const handlePararServico = (servico) => {
    ControllServiceStop(servico.productId, Math.floor(servico.tempoAlugado / 60));
    const novosServicos = servicos.filter(s => s.productId !== servico.productId);
    setServicos(novosServicos);
    localStorage.setItem('servicos', JSON.stringify(novosServicos));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setServicos((prevServicos) => {
        const updatedServicos = prevServicos.map((servico) => {
          if (servico.ativo && servico.tempoAlugado > 0) {
            const now = Date.now();
            const elapsedTime = Math.floor((now - servico.startTime) / 1000); 
            const newTime = servico.tempoAlugado - elapsedTime;
            return {
              ...servico,
              tempoAlugado: newTime > 0 ? newTime : 0,
            };
          }
          return servico;
        });
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

  // Configuração das colunas para o componente Tabela
  const columns = [
    { key: 'nomeUsuario', label: 'Nome' },
    { key: 'cpf', label: 'CPF' },
    { key: 'nomeServico', label: 'Serviço' },
    { key: 'tempoAlugado', label: 'Tempo Alugado', render: (item) => formatTime(item.tempoAlugado) },
  ];

  // Definição das ações para o componente Tabela
  const actions = [
    {
      label: 'Parar',
      className: 'delete-btn',
      onClick: handlePararServico,
    },
  ];

  return (
    <Card>
      <div className="user-manager-container">
        <LoadingModal show={loading} />
        <div className="card-header">Gestão de Serviços</div>
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
          <Tabela
            columns={columns}
            data={servicos}
            actions={actions}
            keyField="productId"
          />
        </div>
      </div>
    </Card>
  );
};

export default AcompanhaServico;
