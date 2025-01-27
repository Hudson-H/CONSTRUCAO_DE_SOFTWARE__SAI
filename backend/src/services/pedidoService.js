const db = require('../config/db');

const adicionarPedido = (idAtendente, senha, valor, dataPedido, estado, informacoes, idPagamento, dataEmissaoPagamento, dataPagamento, formaPagamento, valorTotal, valorPago, troco) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Pedido
      (idAtendente, Senha, Valor, Data_Pedido, Estado, Informacoes, ID_Pagamento, Data_Emissao_Pagamento, Data_Pagamento, Forma_Pagamento, Valor_Total, Valor_Pago, Troco)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [idAtendente, senha, valor, dataPedido, estado, informacoes, idPagamento, dataEmissaoPagamento, dataPagamento, formaPagamento, valorTotal, valorPago, troco],
      (err, result) => {
        if (err) {
          return reject('Erro ao adicionar pedido: ' + err);
        }
        resolve(result);
      }
    );
  });
};


const listarPedidos = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Pedido', (err, results) => {
      if (err) {
        reject('Erro ao buscar pedidos: ' + err);
      }
      resolve(results);
    });
  });
}

const listarPedidoPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Pedido WHERE id = ?', [id], (err, results) => {
      if (err) {
        reject('Erro ao buscar pedido: ' + err);
      }
      resolve(results);
    });
  });
}


const atualizarPedido = (id, camposParaAtualizar) => {
  return new Promise((resolve, reject) => {

    if (!id || !camposParaAtualizar || Object.keys(camposParaAtualizar).length === 0) {
      return reject('Nenhum campo para atualizar fornecido.');
    }

    const campos = Object.keys(camposParaAtualizar);
    const valores = Object.values(camposParaAtualizar);

    const setClause = campos.map((campo) => `${campo} = ?`).join(', ');

    const query = `UPDATE Pedido SET ${setClause} WHERE id = ?`;

    valores.push(id);

    db.query(query, valores, (err, result) => {
      if (err) {
        return reject('Erro ao atualizar pedido: ' + err);
      }
      resolve(result);
    });
  });
};

const deletarPedido = (id) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        return reject('Erro ao iniciar transação: ' + err);
      }

      db.query('DELETE FROM ItemPedido WHERE idPedido = ?', [id], (err, result) => {
        if (err) {
          return db.rollback(() => {
            reject('Erro ao deletar itens do pedido: ' + err);
          });
        }

        db.query('DELETE FROM Pedido WHERE id = ?', [id], (err, result) => {
          if (err) {
            return db.rollback(() => {
              reject('Erro ao deletar pedido: ' + err);
            });
          }

          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                reject('Erro ao confirmar transação: ' + err);
              });
            }

            resolve('Pedido e itens deletados com sucesso!');
          });
        });
      });
    });
  });
};

module.exports = { listarPedidos, listarPedidoPorId, adicionarPedido, atualizarPedido, deletarPedido };