import React, { useState } from 'react';
import { OpenBox } from "../../../services/functions/RequestBox";

const AbrirCaixaComponent = ({ onSuccess, onClose }) => {
  const [valorInicial, setValorInicial] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirmarAbrirCaixa = async () => {
    const valor = parseFloat(valorInicial);
    if (valor >= -1) {
      setLoading(true);
      const agora = new Date();
      await OpenBox();
      localStorage.setItem('dataAbertura', agora.toISOString());
      localStorage.setItem('saldo', valor.toString());
      onSuccess({ valor, dataAbertura: agora });
      onClose();
    } else {
      alert('O valor inicial deve ser igual ou maior que 100.');
    }
    setLoading(false);
  };

  return (
    <div>
      <form>
        <div>
          <label className='titles'>Valor Inicial</label>
          <input
            type="number"
            className="form-control my-2 mb-4"
            value={valorInicial}
            onChange={(e) => setValorInicial(e.target.value)}
            placeholder="Valor Inicial"
          />
        </div>
      </form>
      <div className="btn danger-btn" onClick={handleConfirmarAbrirCaixa}>
        Salvar
      </div>
      <div className="btn secondary-btn" onClick={onClose}>
        Cancelar
      </div>
    </div>
  );
};

export default AbrirCaixaComponent;
