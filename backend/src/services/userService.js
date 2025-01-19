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

const listarUsuarioPorId = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM usuarios WHERE id = ?'; // Placeholder seguro para o parâmetro
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject('Erro ao buscar usuário: ' + err);
      }
      if (results.length === 0) {
        return reject('Usuário não encontrado');
      }
      resolve(results[0]); // Retorna apenas o usuário encontrado
    });
  });
};

const deletarUsuario = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject('Erro ao deletar usuário: ' + err);
      }
      resolve(results);
    });
  });
}

const atualizarUsuario = (id, nome, email) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
    db.query(query, [nome, email, id], (err, results) => {
      if (err) {
        return reject('Erro ao atualizar usuário: ' + err);
      }
      resolve(results);
    });
  });
}

module.exports = { adicionarUsuario, listarUsuarios, listarUsuarioPorId, deletarUsuario, atualizarUsuario };