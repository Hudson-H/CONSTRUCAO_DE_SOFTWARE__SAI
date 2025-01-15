const db = require('../config/db');  // Conexão com o banco de dados

const adicionarUsuario = (nome, email) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';

    db.query(query, [nome, email], (err, result) => {
      if (err) {
        reject('Erro ao adicionar usuário: ' + err);
      }
      resolve(result);
    });
  });
};

const listarUsuarios = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
      if (err) {
        reject('Erro ao buscar usuários: ' + err);
      }
      resolve(results);
    });
  });
};

module.exports = { adicionarUsuario, listarUsuarios };