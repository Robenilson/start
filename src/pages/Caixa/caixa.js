import React, { useState, useEffect } from 'react';
import ModalComponent from '../../components/ModalComponet';
import Card from '../../components/Card';
import LoadingModal from '../../components/LoadingModal';
import Vendas from '../Vendas/vendas';
import AbrirCaixaComponent from './components/AbrirCaixaComponent';
import ListaVendas from './ListaVendas';

const Caixa = () => {
  const [loading, setLoading] = useState(false);
  const [showModalAbrirCaixa, setShowModalAbrirCaixa] = useState(false);
  const [showModalFecharCaixa, setShowModalFecharCaixa] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [caixaAberto, setCaixaAberto] = useState(false);
  const [horaFechamento, setHoraFechamento] = useState(null);
  const [dataAbertura, setDataAbertura] = useState(null);
  const [saldo, setSaldo] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState('caixa');

  useEffect(() => {
    const dataAberturaSalva = localStorage.getItem('dataAbertura');
    if (dataAberturaSalva) {
      setDataAbertura(new Date(dataAberturaSalva));
      setCaixaAberto(true);
      setSaldo(parseFloat(localStorage.getItem('saldo')));
    }
  }, []);

  // Nova função para alternar abas sem erros
  const handleAbaClick = (aba) => {
    setAbaAtiva(aba);
  };

  return (
    <>
      <Card>
        <div className="user-manager-container">
          <div className="card-header">Gestão de Caixa</div>

          <center>
            {caixaAberto ? (
              <button className="btn primary-btn" onClick={() => setShowModalFecharCaixa(true)}>
                Fechar Caixa
              </button>
            ) : (
              <button className="btn primary-btn" onClick={() => setShowModalAbrirCaixa(true)}>
                Abrir Caixa
              </button>
            )}
          </center>

          {caixaAberto && (
            <>
              <div className="tabs mt-3">
                <center>
                  <button
                    className={`btn ${abaAtiva === 'caixa' ? 'secondary-btn' : 'primary-btn'}`}
                    onClick={(e) => { e.preventDefault(); handleAbaClick('caixa'); }}
                    aria-selected={abaAtiva === 'caixa'}
                  >
                    Caixa
                  </button>
                  <button
                    className={`btn ${abaAtiva === 'vendas' ? 'secondary-btn' : 'primary-btn'}`}
                    onClick={(e) => { e.preventDefault(); handleAbaClick('vendas'); }}
                    aria-selected={abaAtiva === 'vendas'}
                  >
                    Vendas
                  </button>
                </center>
              </div>

              {/* Conteúdo das abas */}
              {abaAtiva === 'caixa' && (
                <div className="mt-3">
                  <ListaVendas />
                </div>
              )}

              {abaAtiva === 'vendas' && (
                <div className="mt-3">
                  <Vendas props="caixa" onClose={() => setAbaAtiva('caixa')} />
                </div>
              )}
            </>
          )}

          {/* Modal de Abrir Caixa */}
          <ModalComponent
            show={showModalAbrirCaixa}
            onHide={() => setShowModalAbrirCaixa(false)}
            hideButtons="true"
            title="Abrir Caixa"
          >
            <AbrirCaixaComponent
              onSuccess={({ valor, dataAbertura }) => {
                setSaldo(valor);
                setCaixaAberto(true);
                setDataAbertura(dataAbertura);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
                setShowModalAbrirCaixa(false);
              }}
              onClose={() => setShowModalAbrirCaixa(false)}
            />
          </ModalComponent>

          {/* Modal de Fechar Caixa */}
          <ModalComponent
            show={showModalFecharCaixa}
            onHide={() => setShowModalFecharCaixa(false)}
            title="Fechar Caixa"
          >
            <div>
              <p>Confirma o fechamento do caixa?</p>
              <button className="btn primary-btn" onClick={() => {
                setCaixaAberto(false);
                setHoraFechamento(new Date().toLocaleString());
                setShowModalFecharCaixa(false);
                localStorage.removeItem('dataAbertura');
                localStorage.removeItem('saldo');
              }}>
                Confirmar Fechamento
              </button>
            </div>
          </ModalComponent>

          {/* Sucesso */}
          {showSuccess && (
            <div className="alert alert-success mt-3">
              Operação concluída com sucesso!
            </div>
          )}
        </div>

        <LoadingModal show={loading} />
      </Card>
    </>
  );
};

export default Caixa;
