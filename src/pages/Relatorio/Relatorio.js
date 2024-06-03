import React from 'react';
import Card from '../../components/Card';
import { Table } from 'react-bootstrap';

const Relatorio = () => {
  // Array de dados com exemplos
  const dadosRelatorio = [
    { emailVendedor: 'vendedor1@empresa.com', emailCliente: 'cliente1@dominio.com', tipoCompra: 'Produto', valorCompra: 150.00 },
    { emailVendedor: 'vendedor2@empresa.com', emailCliente: 'cliente2@dominio.com', tipoCompra: 'Serviço', valorCompra: 250.00 },
    { emailVendedor: 'vendedor3@empresa.com', emailCliente: 'cliente3@dominio.com', tipoCompra: 'Produto', valorCompra: 350.00 },
    { emailVendedor: 'vendedor4@empresa.com', emailCliente: 'cliente4@dominio.com', tipoCompra: 'Serviço', valorCompra: 450.00 },
    { emailVendedor: 'vendedor5@empresa.com', emailCliente: 'cliente5@dominio.com', tipoCompra: 'Produto', valorCompra: 550.00 },
    { emailVendedor: 'vendedor6@empresa.com', emailCliente: 'cliente6@dominio.com', tipoCompra: 'Serviço', valorCompra: 650.00 },
    { emailVendedor: 'vendedor7@empresa.com', emailCliente: 'cliente7@dominio.com', tipoCompra: 'Produto', valorCompra: 750.00 },
    { emailVendedor: 'vendedor8@empresa.com', emailCliente: 'cliente8@dominio.com', tipoCompra: 'Serviço', valorCompra: 850.00 },
    { emailVendedor: 'vendedor9@empresa.com', emailCliente: 'cliente9@dominio.com', tipoCompra: 'Produto', valorCompra: 950.00 },
    { emailVendedor: 'vendedor10@empresa.com', emailCliente: 'cliente10@dominio.com', tipoCompra: 'Serviço', valorCompra: 1050.00 },
  ];

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
            <tbody>
              {dadosRelatorio.map((dados, index) => (
                <tr key={index}>
                  <td>{dados.emailVendedor}</td>
                  <td>{dados.emailCliente}</td>
                  <td>{dados.tipoCompra}</td>
                  <td>{dados.valorCompra.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
};

export default Relatorio;
