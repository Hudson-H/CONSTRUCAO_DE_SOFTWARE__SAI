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
    // Consulta o usuário pelo login
    db.query('SELECT * FROM usuarios WHERE login = ?', [login], (err, results) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        return reject('Erro ao buscar usuário no banco de dados.');
      }

      if (results.length === 0) {
        return reject('Usuário não encontrado.');
      }

      const user = results[0];

      // Compara a senha fornecida com o hash no banco de dados
      bcrypt.compare(senha, user.senha, (err, result) => {
        if (err) {
          console.error('Erro ao validar senha:', err);
          return reject('Erro ao validar senha.');
        }

        if (!result) {
          return reject('Senha incorreta.');
        }

        // Armazena informações básicas do usuário na sessão
        if (req.session) {
          req.session.user = {
            id: user.id,
            login: user.login,
            nome: user.nome,
          };
          console.log('Usuário logado com sucesso:', req.session.user);
        } else {
          console.error('Sessão não configurada corretamente.');
          return reject('Erro interno: sessão não inicializada.');
        }

        resolve({
          id: user.id,
          login: user.login,
          nome: user.nome,
        });
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

