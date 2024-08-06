import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import { FetchUserCPF } from '../../services/functions/RequestPeople';
import { FetchBoxUserId } from '../../services/functions/RequestBox';
import { ControllServiceStop,ControllServiceGet} from '../../services/functions/RequestControllService';

import ModalPesquisarCPF from './components/ModalPesquisarCPF';
import ServicoTable from './components/ServicoTable';
import { Button } from 'react-bootstrap';

const AcompanhaServico = () => {
  const [showModal, setShowModal] = useState(false);
  const [servicos, setServicos] = useState([]);
  const [cpf, setCpf] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [selectedServico, setSelectedServico] = useState(null);

  async function filterOrdersWithProductsByType(productType) {
    const data = await FetchBoxUserId();
    const filteredOrders = data
      .map((order) => {
        const filteredProducts = order.produtos.filter(
          (product) => product.productType === productType
        );
        if (filteredProducts.length > 0) {
          return { ...order, produtos: filteredProducts };
        }
        return null;
      })
      .filter((order) => order !== null);
    return filteredOrders;
  }

  const handlePesquisarCPF = async () => {
    const user = await FetchUserCPF(cpf);
    console.log(user)
    setUsuario(user);

    if (user) {
      const productTypeToFilter = 2;
      filterOrdersWithProductsByType(productTypeToFilter)
        .then((filteredOrders) => {
          const novosServicos = [];
          filteredOrders.forEach((order) => {
            order.produtos.forEach((product) => {
              novosServicos.push({
                nomeServico: product.name,
                tempoAlugado: product.quantity * 3600, // Convertendo tempo para segundos (exemplo: quantidade x 3600 segundos)
                orderId: order.id,
                productId: product.productId,
                productType: product.productType,
                dtSale: order.dtSale,
                clientId: order.clientId,
              });
            });
          });
          setUsuario({ ...user, servicos: novosServicos });
        })
        .catch((error) => {
          console.error('Error filtering orders:', error);
        });
    }
  };

  const handleIniciarServico = () => {
    if (selectedServico) {
      const novoServico = {
        nomeUsuario: usuario.nome,
        cpf: usuario.cpf,
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
    console.log(usuario)
    ControllServiceStop(usuario ,formatTime(servicoParaParar.tempoAlugado))



    
   

    setServicos(servicos.filter((_, i) => i !== index));
  };

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
      <div className="card-header">Acompanhar de Serviços</div>
      <div className="card-body">
        <div className="d-flex justify-content-end mr-3">
          <Button className="me-2" onClick={() => setShowModal(true)}>
            Iniciar
          </Button>
        </div>
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
    </Card>
  );
};

export default AcompanhaServico;
