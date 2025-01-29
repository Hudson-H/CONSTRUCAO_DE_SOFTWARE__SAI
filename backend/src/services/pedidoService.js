const { db, beginTransaction, commitTransaction, rollbackTransaction } = require('../config/db'); 

const adicionarPedido = (idAtendente, senha, valor, dataPedido, informacoes, idPagamento, dataEmissaoPagamento, valorTotal) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO Pedido (idAtendente, senha, data_Pedido, informacoes, id_Pagamento, data_Emissao_Pagamento) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [idAtendente, senha, dataPedido, informacoes, idPagamento, dataEmissaoPagamento], (err, result) => {
      if (err) {
        reject('Erro ao adicionar pedido: ' + err);
      }
      resolve(result);
    });
  });
}

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
        return reject('Erro ao buscar pedido: ' + err);
      }

      if (results.length === 0) {
        return reject(`Pedido com ID ${id} não encontrado.`);
      }

      resolve(results[0]); // Retorna o primeiro item (assumindo que IDs são únicos)
    });
  });
};

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
    db.query('DELETE FROM Pedido WHERE id = ?', [id], (err, result) => {
      if (err) {
        reject('Erro ao deletar pedido: ' + err);
      }
      resolve(result);
    });
  });
}

const buscarItemPedidoPorID = (ID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ItemPedido WHERE ID_Item_Pedido = ?`;
  //   console.log("Buscar ItemCardapio, id = " + ID);
    db.query(query, [ID], (err, results) => {
      if (err) {
        return reject('Erro ao buscar ItemPedido: ' + err);
      }
      resolve(results);
    });
  });
};
const atualizarItemPedido = (ID, dados) => {
  return new Promise((resolve, reject) => {
      const campos = [];
      const valores = [];
      Object.keys(dados).forEach((campo) => {
      campos.push(`${campo} = ?`);
      valores.push(dados[campo]);
      });
      valores.push(ID);
      const query = `UPDATE ItemPedido SET ${campos.join(', ')} WHERE ID_Item_Pedido = ?`;
      db.query(query, valores, (err, results) => {
      if (err) {
        return reject('Erro ao atualizar ItemPedido: ' + err);
      }
      resolve(results);
      });
  });
};
const deletarItemPedido = (id) => {
  // console.log("Id do Adicional cardapio = " + id);
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM ItemPedido WHERE ID_Item_Pedido = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject('Erro ao deletar ItemPedido: ' + err);
      }
      resolve(results);
    });
  });
}

const adicionarItemPedido = (dados) => {
  return new Promise((resolve, reject) => {
    const campos = [];
    const valores = [];
    const placeholders = [];
    
    Object.keys(dados).forEach((campo) => {
      campos.push(campo);
      if (dados[campo] == null) {
        valores.push(null);
      } else {
        valores.push(dados[campo]);
      }
      
      placeholders.push('?');
    });
    const query = 
      `INSERT INTO ItemPedido 
      (${campos.join(', ')})
      VALUES (${placeholders.join(', ')})`;
    console.log("query " + query);
    console.log("valores" + valores);
    db.query(query, valores, (err, result) => {
      if (err) {
        return reject('Erro ao adicionar ItemPedido ao Pedido: ' + err);
      } else {
        resolve({ itemPedidoID: result.insertId });
      }
    });
  });
};

module.exports = { listarPedidos, listarPedidoPorId, adicionarPedido, atualizarPedido, deletarPedido, buscarItemPedidoPorID, atualizarItemPedido, deletarItemPedido, adicionarItemPedido};
