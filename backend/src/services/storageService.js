const { db, beginTransaction, commitTransaction, rollbackTransaction } = require('../config/db'); 

const listarEstoque = ({ idItem } = {}) => {
  console.log("idItem recebido:", idItem);
  return new Promise((resolve, reject) => {
    // Define a query com ou sem filtro
    const query = idItem
      ? 'SELECT * FROM Estoque WHERE ID_Item = ? ORDER BY Data_Validade'
      : 'SELECT * FROM Estoque';
    const params = idItem ? [idItem] : []; // Passa o filtro se necessário

    console.log("Query executada:", query, "Parâmetros:", params); // Debug

    db.query(query, params, (err, results) => {
      if (err) {
        return reject('Erro ao listar estoque: ' + err);
      }
      resolve(results);
    });
  });
};



const buscarEstoquePorID = (ID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM estoque WHERE ID = ?`;
    console.log("Buscar estoque, id = " + ID);
    db.query(query, [ID], (err, results) => {
      if (err) {
        return reject('Erro ao buscar estoque: ' + err);
      }
      resolve(results);
    });
  });
};

const adicionarEstoque = (dados) => {
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
        `INSERT INTO estoque 
        (${campos.join(', ')})
        VALUES (${placeholders.join(', ')})`;
  
      db.query(query, valores, (err, result) => {
        if (err) {
          return reject('Erro ao adicionar estoque: ' + err);
        } else {
          resolve(result);
        }
      });
    });
};

const deletarEstoque = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Estoque WHERE ID = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject('Erro ao deletar estoque: ' + err);
      }
      resolve(results);
    });
  });
}


const listarItensEstoque = ({ id_categoria, nome } = {}) => {
  // console.log("listarItensEstoqueService foi chamada!");
  return new Promise((resolve, reject) => {
    // Se `id_categoria` for passado, adiciona um filtro
    let query = 'SELECT * FROM Item WHERE 1=1'
    const params = [];
    if (id_categoria) {
      query += ' AND ID_Categoria = ?';
      params.push(id_categoria);
    }

    if (nome) {
      query += ' AND Nome LIKE ?';
      params.push(`%${nome}%`);
    }

    db.query(query, params, (err, results) => {
      if (err) {
        return reject('Erro ao buscar itens: ' + err);
      }
      resolve(results);
    });
  });
};


const listarCategoriasEstoque = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Categoria', (err, results) => {
      if (err) {
        return reject('Erro ao buscar categorias: ' + err);
      }
      resolve(results);
    });
  });
};

const buscarItemEstoquePorID = (ID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM item WHERE ID = ?`;
    db.query(query, [ID], (err, results) => {
      if (err) {
        return reject('Erro ao buscar item: ' + err);
      }
      resolve(results);
    });
  });
};

const buscarCategoriaEstoquePorID = (ID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM categoria WHERE ID = ?`;
    db.query(query, [ID], (err, results) => {
      if (err) {
        return reject('Erro ao buscar categoria: ' + err);
      }
      resolve(results);
    });
  });
};

const adicionarItemEstoque = (dados) => {
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
        `INSERT INTO item 
        (${campos.join(', ')})
        VALUES (${placeholders.join(', ')})`;
  
      db.query(query, valores, (err, result) => {
        if (err) {
          return reject('Erro ao adicionar item: ' + err);
        } else {
          resolve(result);
        }
      });
    });
};


const deletarItemEstoque = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Item WHERE ID = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        reject('Erro ao deletar item no service: ' + err);
      }

      resolve(results);
    });
  });
}

const removerEstoquePorItem = (idItem) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Estoque WHERE ID_Item = ?';
    const params = [idItem];

    db.query(query, params, (err, results) => {
      if (err) {
        return reject('Erro ao remover composição: ' + err);
      }
      resolve(results);
    });
  });
};


const adicionarCategoriaEstoque = (dados) => {
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
        `INSERT INTO categoria 
        (${campos.join(', ')})
        VALUES (${placeholders.join(', ')})`;
  
      db.query(query, valores, (err, result) => {
        if (err) {
          return reject('Erro ao adicionar categoria: ' + err);
        } else {
          resolve(result);
        }
      });
    });
};

const atualizarEstoque = (ID, dados) => {
    return new Promise((resolve, reject) => {
        const campos = [];
        const valores = [];

        ID = Number(ID);

        Object.keys(dados).forEach((campo) => {
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
        });

        valores.push(ID);

        const query = `UPDATE estoque SET ${campos.join(', ')} WHERE ID = ?`;
        console.log("Query " + query);
        console.log("Valores: ", valores);
        db.query(query, valores, (err, results) => {
          if (err) {
            return reject('Erro ao atualizar Estoque: ' + err);
          }
          resolve(results);
        });
    });
};

const atualizarItemEstoque = (ID, dados) => {
    return new Promise((resolve, reject) => {
        const campos = [];
        const valores = [];

        Object.keys(dados).forEach((campo) => {
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
        });

        valores.push(ID);

        const query = `UPDATE item SET ${campos.join(', ')} WHERE ID = ?`;
        db.query(query, valores, (err, results) => {
        if (err) {
          return reject('Erro ao atualizar Item: ' + err);
        }
        resolve(results);
        });
    });
};

const atualizarCategoriaEstoque = (ID, dados) => {
    return new Promise((resolve, reject) => {
        const campos = [];
        const valores = [];

        Object.keys(dados).forEach((campo) => {
        campos.push(`${campo} = ?`);
        valores.push(dados[campo]);
        });

        valores.push(ID);

        const query = `UPDATE categoria SET ${campos.join(', ')} WHERE ID = ?`;
        db.query(query, valores, (err, results) => {
        if (err) {
          return reject('Erro ao atualizar Categoria: ' + err);
        }
        resolve(results);
        });
    });
};

const deletarCategoriaEstoque = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM Categoria WHERE ID = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject('Erro ao deletar categoria: ' + err);
      }
      resolve(results);
    });
  });
}


module.exports = {listarEstoque, removerEstoquePorItem, buscarEstoquePorID, listarItensEstoque, listarCategoriasEstoque, buscarItemEstoquePorID, buscarCategoriaEstoquePorID, adicionarEstoque, adicionarItemEstoque, adicionarCategoriaEstoque, atualizarEstoque, atualizarItemEstoque, atualizarCategoriaEstoque, deletarEstoque, deletarItemEstoque, deletarCategoriaEstoque};