import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { FetchUserCPF } from '../../services/functions/RequestPeople';
import LoadingModal from '../../components/LoadingModal';
import { ControllServiceStop,ControllServiceGet} from '../../services/functions/RequestControllService';

import ModalPesquisarCPF from './components/ModalPesquisarCPF';
import ServicoTable from './components/ServicoTable';


const AcompanhaServico = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [servicos, setServicos] = useState([]);
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [selectedServico, setSelectedServico] = useState(null);

  

  const handlePesquisarCPF = async () => {
    setLoading(true);
    const user = await FetchUserCPF(cpf);
    setUsuario(user);

    if (user) {
      const novosServicos = [];
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
      setServicos([...servicos, novoServico]);
      setShowModal(false);
      setSelectedServico(null);
    }
  };

  const handlePararServico = (index) => {
    const servicoParaParar = servicos[index];
    console.log(servicoParaParar.productId ,parseInt(formatTimeToMinutes(formatTime(servicoParaParar.tempoAlugado))))
    ControllServiceStop(servicoParaParar.productId ,parseInt(formatTimeToMinutes(formatTime(servicoParaParar.tempoAlugado))))
    setServicos(servicos.filter((_, i) => i !== index));
  };


  function formatTimeToMinutes(timeStr) {
    // Dividir o tempo na forma HH:MM:SS
    const [hours, minutes, seconds] = timeStr.split(':').map(Number)  
    // Converter para minutos
    const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);   
    return totalMinutes;
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setServicos((prevServicos) =>
        prevServicos.map((servico) =>
          servico.ativo && servico.tempoAlugado > 0
            ? { ...servico, tempoAlugado: servico.tempoAlugado - 1 }
            : servico
        )
      );
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
