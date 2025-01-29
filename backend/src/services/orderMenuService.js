const { db, beginTransaction, commitTransaction, rollbackTransaction } = require('../config/db'); 

const listarComposicao = async ({ idItemCardapio, idItem } = {}) => {
    console.log("idItem recebido:", idItem);
    return new Promise((resolve, reject) => {
      // Define a query com ou sem filtro
      let query = 'SELECT * FROM CompostoPor WHERE 1=1'
      const params = [];

      if (idItemCardapio) {
        query += ' AND Id_Item_Cardapio = ?';
        params.push(idItemCardapio);
      }
  
      if (idItem) {
        query += ' AND Id_Item = ?';
        params.push(idItem);
      }

  
      console.log("Query executada:", query, "Parâmetros:", params); // Debug
  
      db.query(query, params, (err, results) => {
        if (err) {
          return reject('Erro ao listar Composicao: ' + err);
        }
        resolve(results);
      });
    });
  };
  //nao foi testado ainda
  const listarAdicionados = async ({ idItemPedido, idItemCardapio, idAdicional } = {}) => {
    // console.log("idItem recebido:", idItem);
    return new Promise((resolve, reject) => {
      // Define a query com ou sem filtro
      let query = 'SELECT * FROM Adicionar WHERE 1=1'
      const params = [];

      if (idItemPedido) {
        query += ' AND Id_Item_Pedido = ?';
        params.push(idItemPedido);
      }

      if (idItemCardapio) {
        query += ' AND Id_Item_Cardapio = ?';
        params.push(idItemCardapio);
      }
  
      if (idAdicional) {
        query += ' AND Id_Adicional = ?';
        params.push(idAdicional);
      }

  
      console.log("Query executada:", query, "Parâmetros:", params); // Debug
  
      db.query(query, params, (err, results) => {
        if (err) {
          return reject('Erro ao listar Adicionados: ' + err);
        }
        resolve(results);
      });
    });
  };

  const listarItensCardapio = ({ idSecaoCardapio, nome} = {}) => {
    // console.log("idItem recebido:", idItem);
    return new Promise((resolve, reject) => {
      // Define a query com ou sem filtro
      let query = 'SELECT * FROM ItemCardapio WHERE 1=1'
      const params = [];

      if (idSecaoCardapio) {
        query += ' AND Id_SecaoCardapio = ?';
        params.push(idSecaoCardapio);
      }

      if (nome) {
        query += ' AND Nome LIKE ?';
        params.push(`%${nome}%`);
      }
  
      console.log("Query executada:", query, "Parâmetros:", params); // Debug
  
      db.query(query, params, (err, results) => {
        if (err) {
          return reject('Erro ao listar Itens: ' + err);
        }
        resolve(results);
      });
    });
  };

const buscarItemCardapioPorID = (ID) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM ItemCardapio WHERE ID = ?`;
    //   console.log("Buscar ItemCardapio, id = " + ID);
      db.query(query, [ID], (err, results) => {
        if (err) {
          return reject('Erro ao buscar ItemCardapio: ' + err);
        }
        resolve(results);
      });
    });
  };

  const buscarAdicionarPorID = (ID) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Adicionar WHERE ID_Item_Pedido = ?`;
    //   console.log("Buscar ItemCardapio, id = " + ID);
      db.query(query, [ID], (err, results) => {
        if (err) {
          return reject('Erro ao buscar Adicionar: ' + err);
        }
        resolve(results);
      });
    });
  };


  const adicionarAdicionar = (dados) => {
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
        `INSERT INTO Adicionar 
        (${campos.join(', ')})
        VALUES (${placeholders.join(', ')})`;
  
      db.query(query, valores, (err, result) => {
        if (err) {
          return reject('Erro ao adicionar Adicional no Pedido: ' + err);
        } else {
          resolve(result);
        }
      });
    });
};

const adicionarItemCardapio = (dados) => {
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
        `INSERT INTO ItemCardapio 
        (${campos.join(', ')})
        VALUES (${placeholders.join(', ')})`;
  
      db.query(query, valores, (err, result) => {
        if (err) {
          return reject('Erro ao adicionar ItemCardapio: ' + err);
        } else {
          resolve(result);
        }
      });
    });
};


const deletarItemCardapio = (id) => {
    console.log("Id do Item cardapio = " + id);
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM ItemCardapio WHERE ID = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject('Erro ao deletar ItemCardapio: ' + err);
        }
        resolve(results);
      });
    });
  }

  const listarSecoesCardapio = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM SecaoCardapio', (err, results) => {
        if (err) {
          reject('Erro ao buscar usuários: ' + err);
        }
        resolve(results);
      });
    });
  };

  const listarAdicionaisCardapio = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Adicional', (err, results) => {
        if (err) {
          reject('Erro ao buscar adicionais: ' + err);
        }
        resolve(results);
      });
    });
  };
  
  


const buscarSecaoCardapioPorID = (ID) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM SecaoCardapio WHERE ID = ?`;
    //   console.log("Buscar SecaoCardapio, id = " + ID);
      db.query(query, [ID], (err, results) => {
        if (err) {
          return reject('Erro ao buscar SecaoCardapio: ' + err);
        }
        resolve(results);
      });
    });
  };
  


const adicionarSecaoCardapio = (dados) => {
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
        `INSERT INTO SecaoCardapio 
        (${campos.join(', ')})
        VALUES (${placeholders.join(', ')})`;
  
      db.query(query, valores, (err, result) => {
        if (err) {
          return reject('Erro ao adicionar SecaoCardapio: ' + err);
        } else {
          resolve(result);
        }
      });
    });
};

const deletarSecaoCardapio = (id) => {
    console.log("Id do Secao cardapio = " + id);
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM SecaoCardapio WHERE ID = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return reject('Erro ao deletar SecaoCardapio: ' + err);
        }
        resolve(results);
      });
    });
  }


const buscarAdicionalCardapioPorID = (ID) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Adicional WHERE ID = ?`;
    //   console.log("Buscar SecaoCardapio, id = " + ID);
      db.query(query, [ID], (err, results) => {
        if (err) {
          return reject('Erro ao buscar Adicional do Cardapio: ' + err);
        }
        resolve(results);
      });
    });
  };

const adicionarAdicionalCardapio = (dados) => {
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
        `INSERT INTO Adicional 
        (${campos.join(', ')})
        VALUES (${placeholders.join(', ')})`;
  
      db.query(query, valores, (err, result) => {
        if (err) {
          return reject('Erro ao adicionar Adicional no Cardapio: ' + err);
        } else {
          resolve(result);
        }
      });
    });
};

const atualizarAdicionar = (ID, dados) => {
  return new Promise((resolve, reject) => {
      const campos = [];
      const valores = [];

      Object.keys(dados).forEach((campo) => {
      campos.push(`${campo} = ?`);
      valores.push(dados[campo]);
      });

      valores.push(ID);

      const query = `UPDATE Adicionar SET ${campos.join(', ')} WHERE ID_Item_Pedido = ?`;
      db.query(query, valores, (err, results) => {
      if (err) {
        return reject('Erro ao atualizar adicional no pedido: ' + err);
      }
      resolve(results);
      });
  });
};

const atualizarItemCardapio = (ID, dados) => {
    return new Promise((resolve, reject) => {
        const campos = [];
        const valores = [];

        Object.keys(dados).forEach((campo) => {
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
        });

        valores.push(ID);

        const query = `UPDATE ItemCardapio SET ${campos.join(', ')} WHERE ID = ?`;
        db.query(query, valores, (err, results) => {
        if (err) {
          return reject('Erro ao atualizar ItemCardapio: ' + err);
        }
        resolve(results);
        });
    });
};

const deletarAdicionalCardapio = (id) => {
  // console.log("Id do Adicional cardapio = " + id);
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Adicional WHERE ID = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject('Erro ao deletar Adicional: ' + err);
      }
      resolve(results);
    });
  });
}

const deletarAdicionar= (id) => {
  // console.log("Id do Adicional cardapio = " + id);
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Adicionar WHERE ID_Item_Pedido = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject('Erro ao deletar Adicional do pedido: ' + err);
      }
      resolve(results);
    });
  });
}

const removerComposicaoPorItemCardapio = (idItemCardapio) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM CompostoPor WHERE ID_Item_Cardapio = ?';
    const params = [idItemCardapio];

    db.query(query, params, (err, results) => {
      if (err) {
        return reject('Erro ao remover composição: ' + err);
      }
      resolve(results);
    });
  });
};

const removerItemCardapioAdicionar = (idItemCardapio) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE Adicionar SET ID_Item_Cardapio = NULL WHERE ID_Item_Cardapio = ?';
    const params = [idItemCardapio];

    db.query(query, params, (err, results) => {
      if (err) {
        return reject('Erro ao remover composição: ' + err);
      }
      resolve(results);
    });
  });
};

const atualizarAdicionaisAposPedido = async (lotes, quantidade) => {
  console.log("Lotes = " + JSON.stringify(lotes));
  console.log("Quantidade a ser diminuida = " + quantidade);

  return new Promise(async (resolve, reject) => {
    try {
      // Verifica se existem lotes para processar
      if (lotes.length === 0) {
        return reject("Nenhum lote encontrado no estoque.");
      }

      let quantidadeRestante = quantidade;

      // Itera sobre os lotes para processar cada um
      for (const [index, lote] of lotes.entries()){
        const { ID: idLote, Quantidade: quantidadeDisponivel } = lote;
        let quantidadeParaDiminuir = Math.min(quantidadeRestante, quantidadeDisponivel);
        console.log("Quantidade para diminuir = " + quantidadeParaDiminuir);

        // Atualiza o estoque com a quantidade a ser diminuída
        // Aqui você realiza a lógica de decremento
        
        const isLastLote = index === lotes.length - 1;

        if(quantidadeDisponivel < quantidadeRestante && isLastLote ){
          console.log("Não há estoque suficiente para completar o pedido no último lote.");
          return reject(new Error("Estoque insuficiente para completar o pedido."));
        }
      

        const query = `UPDATE Estoque SET Quantidade = Quantidade - ? WHERE ID = ?`;
        try {
          // Aguarda a execução da query
          await new Promise((resolveQuery, rejectQuery) => {
            db.query(query, [quantidadeParaDiminuir, idLote], (err, result) => {
              if (err) {
                console.error("Erro ao atualizar o estoque:", err);
                return rejectQuery("Erro ao atualizar o estoque.");
              }
              console.log(`Estoque do Lote ${idLote} atualizado: -${quantidadeParaDiminuir}`);
              resolveQuery();
            });
          });

          // Atualiza a quantidade restante após a operação
          quantidadeRestante -= quantidadeParaDiminuir;
          console.log("QuantidadeRestante = " + quantidadeRestante);

          // Se a quantidade restante for 0, encerra a atualização
          if (quantidadeRestante <= 0) {
            return resolve("Estoque atualizado com sucesso.");
          }
        } catch (err) {
          return reject(err);
        }
      }

      // Se ainda houver quantidade restante, significa que não foi possível atualizar todo o estoque
      if (quantidadeRestante > 0) {
        return reject("Quantidade não foi completamente retirada do estoque.");
      }
    } catch (err) {
      console.error("Erro:", err);
      reject(err);
    }
  });
};

const buscarEstoquePorItem = async (idItem) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT ID, Quantidade 
      FROM Estoque 
      WHERE ID_ITEM = ? AND Quantidade > 0 
      ORDER BY Data_Validade;`;
    db.query(query, [idItem], (err, results) => {
      if (err) {
        console.error("Erro ao buscar estoque pelo item:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

const atualizarEstoqueAposPedido = async (idPedido) => {
  console.log("Atualizando Service");
  return new Promise((resolve, reject) => {
    // Consulta para buscar os itens no pedido
    const query = `
      SELECT 
      nomes_adicionais.ID_Item_Cardapio, nomes_adicionais.Quantidade_Adicional, ad.ID_Item FROM Adicional ad RIGHT OUTER JOIN (
      SELECT A.ID_Item_Cardapio, A.ID_Adicional, A.Quantidade_Adicional 
      FROM Adicionar A 
      NATURAL JOIN (
        SELECT ID_Item_Pedido FROM ItemPedido IP 
        WHERE IP.ID_Pedido = ?
      ) AS result
      ) AS nomes_adicionais ON nomes_adicionais.ID_Adicional = ad.ID;`;

    // Parâmetros da consulta
    const params = [idPedido];

    // Executa a consulta com db.query
    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Erro ao buscar itens no pedido:", err);
        return reject("Erro ao buscar itens no pedido: " + err);
      }

      // Arrays para armazenar os resultados
      const idItemsCardapio = [];
      const adicionais = [];

      // Itera sobre os resultados da consulta
      results.forEach((row) => {
        if (row.ID_Item_Cardapio) {
          idItemsCardapio.push(row.ID_Item_Cardapio); // Adiciona ao array de itens do cardápio
        }

        if (row.ID_Item && row.Quantidade_Adicional) {
          adicionais.push({
            idItem: row.ID_Item,
            quantidade: row.Quantidade_Adicional,
          });
        }
      });

      // Log dos resultados (opcional)
      console.log("Itens do Cardápio:", idItemsCardapio);
      console.log("Adicionais:", adicionais);

      // Retorna os resultados
      resolve({ idItemsCardapio, adicionais });
    });
  });


  


//   return new Promise((resolve, reject) => {
//     const query = `SELECT 
// adicionais.ID_Item_Pedido,
// adicionais.ID as ID_Item,
// adicionais.Nome,
// adicionais.Quantidade_Composicao,
// -- adicionais.Valor as Valor_Item_Cardapio,
// adicionais.ID_Adicional,
// adicionais.Quantidade_Adicional,
// adi.Nome,
// adi.Valor
// FROM Adicional adi right OUTER JOIN (
// 	SELECT itens.ID_Item_Pedido, IT.ID, IT.Nome, itens.Quantidade_Composicao, itens.Valor, itens.ID_Adicional, itens.Quantidade_Adicional 
// 	FROM Item IT 
// 	INNER JOIN (
// 		SELECT 
// 			CP.ID_Item_Cardapio, 
// 			CP.ID_Item, 
// 			CP.Quantidade_Composicao, 
// 			Composicao.Nome, 
// 			Composicao.ID, 
// 			Composicao.Valor, 
// 			Composicao.ID_Adicional,
// 			Composicao.ID_Item_Pedido,
// 			Composicao.Quantidade_Adicional 
// 		FROM CompostoPor CP 
// 		INNER JOIN (
// 			SELECT 
// 				Cardapio.ID_Item_Pedido, 
// 				IC.Nome, 
// 				IC.ID, 
// 				IC.Valor, 
// 				Cardapio.ID_Adicional, 
// 				Cardapio.Quantidade_Adicional 
// 			FROM ItemCardapio IC 
// 			INNER JOIN (
// 				SELECT 
// 					A.ID_Item_Pedido, 
// 					A.ID_Item_Cardapio, 
// 					A.ID_Adicional, 
// 					A.Quantidade_Adicional 
// 				FROM Adicionar A 
// 				NATURAL JOIN (
// 					SELECT 
// 						ID_Item_Pedido 
// 					FROM ItemPedido IP 
// 					WHERE IP.ID_Pedido = ?
// 				) AS result
// 			) AS Cardapio
// 			ON IC.ID = Cardapio.ID_Item_Cardapio
// 		) AS Composicao 
// 		ON CP.ID_Item_Cardapio = Composicao.ID
// 	) AS itens 
// 	ON IT.ID = itens.ID_Item
// )AS adicionais
// ON adi.ID = adicionais.ID_Adicional;';`
//     const params = [idItemCardapio];

//     db.query(query, params, (err, results) => {
//       if (err) {
//         return reject('Erro ao remover composição: ' + err);
//       }
//       resolve(results);
//     });
//   });
};
  



module.exports = {atualizarEstoqueAposPedido, buscarEstoquePorItem, atualizarAdicionaisAposPedido,removerItemCardapioAdicionar, listarComposicao, listarAdicionados, adicionarAdicionar, listarItensCardapio, buscarItemCardapioPorID, buscarAdicionarPorID, adicionarItemCardapio, deletarItemCardapio,listarSecoesCardapio, buscarSecaoCardapioPorID, adicionarSecaoCardapio, deletarSecaoCardapio,listarAdicionaisCardapio, buscarAdicionalCardapioPorID, adicionarAdicionalCardapio,atualizarAdicionar, atualizarItemCardapio, deletarAdicionalCardapio, removerComposicaoPorItemCardapio, deletarAdicionar};