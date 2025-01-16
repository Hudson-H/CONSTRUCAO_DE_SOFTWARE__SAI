const bcrypt = require('bcrypt');
const db = require('../config/db');

const adicionarUsuario = (login, senha) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedSenha = await bcrypt.hash(senha, 10);
      const query = 'INSERT INTO usuarios (login, senha) VALUES (?, ?)';
      db.query(query, [login, hashedSenha], (err, result) => {
        if (err) {
          return reject('Erro ao adicionar usuário: ' + err);
        }
        resolve(result);
      });
    } catch (err) {
      reject('Erro ao criptografar senha: ' + err);
    }
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

const loginUsuario = (req, login, senha) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuarios WHERE login = ?', [login], (err, results) => {
      if (err) {
        reject('Erro ao buscar usuário: ' + err);
      }
      if (results.length === 0) {
        reject('Usuário não encontrado.');
      }
      const user = results[0];

      console.log("USER: ", results);
      bcrypt.compare(senha, user.senha, (err, result) => {
        if (result) {
          req.session.user = {
            id: user.id,
            login: user.login,
            senha: user.nome
          };

          resolve(user);
        } else {
          reject('Senha incorreta.');
        }
      });
    });
  });
};

const listarUsuarioPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
      if (err) {
        reject('Erro ao buscar usuário: ' + err);
      }
      resolve(results);
    });
  });
}
const atualizarUsuario = (id, login, senha) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = 'UPDATE usuarios SET ';
      const params = [];

      if (login) {
        query += 'login = ?';
        params.push(login);
      }

      if (senha) {
        const hashedSenha = await bcrypt.hash(senha, 10);
        if (params.length > 0) query += ', ';
        query += 'senha = ?';
        params.push(hashedSenha);
      }

      query += ' WHERE id = ?';
      params.push(id);

      if (params.length === 1) {
        return reject('Nenhum campo válido para atualizar foi fornecido.');
      }

      db.query(query, params, (err, result) => {
        if (err) {
          return reject('Erro ao atualizar usuário: ' + err);
        }
        resolve(result);
      });
    } catch (err) {
      reject('Erro ao processar atualização: ' + err.message);
    }
  });
};


module.exports = { adicionarUsuario, listarUsuarios, loginUsuario, listarUsuarioPorId, atualizarUsuario };

