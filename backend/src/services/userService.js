const db = require('../config/db');  // Conexão com o banco de dados

const adicionarUsuario = (login, senha) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO Usuario (Login, Senha) VALUES (?, ?)';

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
    db.query('SELECT * FROM Usuario', (err, results) => {

      if (err) {
        reject('Erro ao buscar usuários: ' + err);
      }
      resolve(results);
    });
  });
};

const listarUsuarioPorId = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM usuario WHERE id = ?'; // Placeholder seguro para o parâmetro
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
    const query1 = 'DELETE FROM permitido WHERE idUsuario = ?';
    db.query(query1, [id], (err, results) => {
      if (err) {
        return reject('Erro ao deletar permissão de usuário: ' + err);
      }
      resolve(results);
    });


    const query2 = 'DELETE FROM usuario WHERE id = ?';
    db.query(query2, [id], (err, results) => {
      if (err) {
        return reject('Erro ao deletar usuário: ' + err);
      }
      resolve(results);
    });
  });
}

const atualizarUsuario = (id, nome, email) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE usuario SET Login = ?, Senha = ? WHERE id = ?';
    db.query(query, [nome, email, id], (err, results) => {
      if (err) {
        return reject('Erro ao atualizar usuário: ' + err);
      }
      resolve(results);
    });
  });
}

module.exports = { adicionarUsuario, listarUsuarios, listarUsuarioPorId, deletarUsuario, atualizarUsuario };
