const db = require('../config/db');

const pedidosEnum = {
  EM_ANDAMENTO: 3,
  CONCLUIDO: 5,
};

const getStatus = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Pedido WHERE Estado = ?';

    sessionStatus = session;

    db.query(query, [pedidosEnum[EM_ANDAMENTO]], (err, pedidosEmAndamento) => {
      if (err) {
        return reject('Erro ao obter pedidos em andamento: ' + err);
      }

      db.query(query, [pedidosEnum[CONCLUIDO]], (err, pedidosConcluidos) => {
        if (err) {
          return reject('Erro ao obter pedidos concluídos: ' + err);
        }

        resolve({
          pedidosEmAndamento,
          pedidosConcluidos,
          sessionStatus,
        });
      });
    });
  });
};

module.exports = { getStatus };
