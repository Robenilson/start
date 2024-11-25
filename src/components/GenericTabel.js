import React from 'react';
const Tabela = ({ columns, data, actions, keyField }) => {
  return (
    <div className="table-container table-responsive">
    <table className="user-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
          {actions && <th>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item[keyField] || index}>
            {columns.map((column) => (
              <td key={column.key}>{column.render ? column.render(item) : item[column.key]}</td>
            ))}
            {actions && (
              <td>
                {actions.map((action, idx) => (
                  <button
                    key={idx}
                    className={`action-btn ${action.className}`}
                    onClick={() => action.onClick(item)}
                  >
                    {action.label}
                  </button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
      </div>
  );
};
export default Tabela;
