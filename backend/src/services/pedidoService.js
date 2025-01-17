const db = require('../config/db');

const adicionarPedido = (idAtendente, senha, valor, dataPedido, informacoes, idPagamento, dataEmissaoPagamento, valorTotal) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO pedidos (idAtendente, senha, valor, dataPedido, informacoes, idPagamento, dataEmissaoPagamento, valorTotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [idAtendente, senha, valor, dataPedido, informacoes, idPagamento, dataEmissaoPagamento, valorTotal], (err, result) => {
      if (err) {
        reject('Erro ao adicionar pedido: ' + err);
      }
      resolve(result);
    });
  });
}

const listarPedidos = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM pedidos', (err, results) => {
      if (err) {
        reject('Erro ao buscar pedidos: ' + err);
      }
      resolve(results);
    });
  });
}

const listarPedidoPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM pedidos WHERE id = ?', [id], (err, results) => {
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

    const query = `UPDATE pedidos SET ${setClause} WHERE id = ?`;

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
    db.query('DELETE FROM pedidos WHERE id = ?', [id], (err, result) => {
      if (err) {
        reject('Erro ao deletar pedido: ' + err);
      }
      resolve(result);
    });
  });
}

module.exports = { listarPedidos, listarPedidoPorId, adicionarPedido, atualizarPedido, deletarPedido };