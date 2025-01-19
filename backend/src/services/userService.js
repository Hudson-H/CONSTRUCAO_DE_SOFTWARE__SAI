const db = require('../config/db');  // Conexão com o banco de dados

const adicionarUsuario = (login, senha) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO usuario (Login, Senha) VALUES (?, ?)';

    db.query(query, [login, senha], (err, result) => {
      if (err) {
        reject('Erro ao adicionar usuário: ' + err);
      }
      resolve(result);
    });
  });
};

const listarUsuarios = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuario', (err, results) => {
      if (err) {
        reject('Erro ao buscar usuários: ' + err);
      }
      resolve(results);
    });
  });
};

module.exports = { adicionarUsuario, listarUsuarios };