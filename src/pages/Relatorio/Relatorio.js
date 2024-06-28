import React from 'react';
import Card from '../../components/Card';
import { Table } from 'react-bootstrap';

const Relatorio = () => {
 

  return (
    <>
      <Card>
        <div className="card-header">Relatório de Compras</div>
        <div className="card-body">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Email do Vendedor</th>
                <th>Email do Cliente</th>
                <th>Tipo de Compra</th>
                <th>Valor da Compra (R$)</th>
              </tr>
            </thead>
           
          </Table>
        </div>
      </Card>
    </>
  );
};

export default Relatorio;
