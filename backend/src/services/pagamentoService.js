const db = require('../config/db');

// visto que não há uma tabela de pagamento, quando o usuário bater na rota
// para criar pagamento, ele apenas recebe os campos correspondentes aos campos
// de pagamento e atualiza na tabela de pedidos

const adicionarPagamento = (id, camposParaAtualizar) => {
    return new Promise((resolve, reject) => {
  
      if (!id || !camposParaAtualizar || Object.keys(camposParaAtualizar).length === 0) {
        return reject('Nenhum campo para adicionar pagamento foi fornecido.');
      }
  
      const campos = Object.keys(camposParaAtualizar);
      const valores = Object.values(camposParaAtualizar);
  
      const setClause = campos.map((campo) => `${campo} = ?`).join(', ');
  
      const query = `UPDATE Pedido SET ${setClause} WHERE id = ?`;
  
      valores.push(id);
  
      db.query(query, valores, (err, result) => {
        if (err) {
          return reject('Erro ao adicionar pagamento ' + err);
        }
        resolve(result);
      });
    });
  };

module.exports = { adicionarPagamento };