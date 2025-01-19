const db = require('../config/db');  // Conexão com o banco de dados


// adiciona um funcionário ao banco
const adicionarFuncionario = (dados) => {
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
      `INSERT INTO funcionario 
      (${campos.join(', ')})
      VALUES (${placeholders.join(', ')})`;

    db.query(query, valores, (err, result) => {
      if (err) {
        reject('Erro ao adicionar funcionário: ' + err);
      } else {
        resolve(result);
      }
    });
  });
};

// lista todos os funcionários no banco
const listarFuncionarios = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM funcionario', (err, results) => {
      if (err) {
        reject('Erro ao buscar usuários: ' + err);
      }
      resolve(results);
    });
  });
};

//  busca um funcionário específico por ID
const buscarFuncionarioPorID = (ID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM funcionario WHERE ID_Usuario = ?`;
    db.query(query, [ID], (err, results) => {
      if (err) {
        reject('Erro ao buscar usuários: ' + err);
      }
      resolve(results);
    });
  });
};

// atualiza os dados de um funcionário no banco
const atualizarFuncionario = (ID, dados) => {
  return new Promise((resolve, reject) => {
    const campos = [];
    const valores = [];

    Object.keys(dados).forEach((campo) => {
      campos.push(`${campo} = ?`);
      valores.push(dados[campo]);
    });

    valores.push(ID);

    const query = `UPDATE funcionario SET ${campos.join(', ')} WHERE ID_USUARIO = ?`;
    db.query(query, valores, (err, results) => {
      if (err) {
        reject('Erro ao atualizar funcionário: ' + err);
      }
      resolve(results);
    });
  });
};


module.exports = { adicionarFuncionario, listarFuncionarios, buscarFuncionarioPorID, atualizarFuncionario };