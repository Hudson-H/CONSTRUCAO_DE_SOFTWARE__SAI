const db = require('../config/db');  // Conexão com o banco de dados

const listarComposicao = ({ idItemCardapio, idItem } = {}) => {
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
  const listarAdicionados = ({ idItemPedido, idItemCardapio, idAdicional } = {}) => {
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


module.exports = {listarComposicao, listarAdicionados, listarItensCardapio, buscarItemCardapioPorID, adicionarItemCardapio, deletarItemCardapio,listarSecoesCardapio, buscarSecaoCardapioPorID, adicionarSecaoCardapio, deletarSecaoCardapio,listarAdicionaisCardapio, buscarAdicionalCardapioPorID, adicionarAdicionalCardapio, atualizarItemCardapio, deletarAdicionalCardapio, removerComposicaoPorItemCardapio};