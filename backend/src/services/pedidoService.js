const db = require('../config/db');

const calcularValorPedido = (idPedido) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
      SUM(adicionais.Preco_Item) +
      SUM(
        CASE
          WHEN adic.Valor IS NOT NULL THEN adic.Valor * adicionais.Quantidade_Adicional
          ELSE 0
        END
      ) AS Valor_Total
    FROM 
      Adicional adic 
    RIGHT OUTER JOIN (
      SELECT 
        result.ID_Item_Cardapio, 
        result.ID_Adicional, 
        result.Quantidade_Adicional, 
        IC.Valor AS Preco_Item 
      FROM 
        ItemCardapio IC 
      JOIN (
        SELECT 
            AD.ID_Item_Cardapio, 
            AD.ID_Adicional, 
            AD.Quantidade_Adicional 
        FROM 
          ItemPedido IP
        NATURAL JOIN 
          Adicionar AD 
        WHERE 
          ID_Pedido = 1
      ) AS result 
      ON IC.ID = result.ID_Item_Cardapio
    ) AS adicionais 
    ON adicionais.ID_Adicional = adic.ID;
    `;

    db.query(query, [idPedido], (err, result) => {
      if (err) {
        reject('Erro ao calcular valor: ' + err);
      }
      resolve(result);
    });
  });
}

const adicionarPedido = (idAtendente, senha, dataPedido, informacoes, idPagamento, dataEmissaoPagamento) => {
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

module.exports = { listarPedidos, listarPedidoPorId, adicionarPedido, atualizarPedido, deletarPedido, calcularValorPedido };