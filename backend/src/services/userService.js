const bcrypt = require('bcrypt');
const db = require('../config/db');
const crypto = require('crypto');

const adicionarUsuario = (login, senha) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedSenha = await bcrypt.hash(senha, 10);
      const query = 'INSERT INTO Usuario (login, senha) VALUES (?, ?)';
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
    db.query('SELECT * FROM Usuario', (err, results) => {
      if (err) {
        reject('Erro ao buscar usuários: ' + err);
      }
      resolve(results);
    });
  });
};

function gerarTokenAleatorio() {
  return crypto.randomBytes(32).toString('hex');
}

const loginUsuario = (req, login, senha) => {
  return new Promise((resolve, reject) => {
    const connection = db;
    const token = gerarTokenAleatorio();
    const expiration_time = new Date(Date.now() + 86400000);
    const formattedExpirationTime = expiration_time.toISOString().slice(0, 19).replace('T', ' ');

    connection.beginTransaction((err) => {
      if (err) {
        return reject('Erro ao iniciar transação: ' + err);
      }

      connection.query('SELECT * FROM Usuario WHERE login = ?', [login], (err, results) => {
        if (err) {
          connection.rollback(() => reject('Erro ao buscar usuário no banco de dados: ' + err));
          return;
        }

        if (results.length === 0) {
          connection.rollback(() => reject('Usuário não encontrado.'));
          return;
        }
        const user = results[0];
        bcrypt.compare(senha, user.Senha, (err, result) => {
          if (err) {
            connection.rollback(() => reject('Erro ao validar senha: ' + err));
            return;
          }

          if (!result) {
            connection.rollback(() => reject('Senha incorreta.'));
            return;
          }

          adicionarTokenTabela(user.ID, token, formattedExpirationTime)
            .then(() => {
              if (req.session) {
                req.session.user = {
                  id: user.ID,
                  token: token,
                  expirationTime: formattedExpirationTime,
                };
              } else {
                connection.rollback(() => reject('Erro interno: sessão não inicializada.'));
                return;
              }

              connection.commit((err) => {
                if (err) {
                  connection.rollback(() => reject('Erro ao confirmar transação: ' + err));
                  return;
                }

                resolve({
                  id: user.id,
                  token: token,
                  expirationTime: formattedExpirationTime,
                });
              });
            })
            .catch((err) => {
              connection.rollback(() => reject('Erro ao adicionar token na tabela sessions: ' + err));
            });
        });
      });
    });
  });
};

const adicionarTokenTabela = (user_id, token, expiration_time) => {
  console.log('Adicionando token na tabela sessions:', user_id, token, expiration_time);

  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO user_session (user_id, token, expiration_time) VALUES (?, ?, ?)';
    db.query(query, [user_id, token, expiration_time], (err, result) => {
      if (err) {
        return reject('Erro ao adicionar token: ' + err);
      }
      resolve(result);
    });
  });
};


const listarUsuarioPorId = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Usuario WHERE id = ?', [id], (err, results) => {
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
      let query = 'UPDATE Usuario SET ';
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

const deletarUsuario = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM Usuario WHERE id = ?', [id], (err, result) => {
      if (err) {
        reject('Erro ao deletar usuário: ' + err);
      }
      resolve(result);
    });
  });
}


module.exports = { adicionarUsuario, listarUsuarios, loginUsuario, listarUsuarioPorId, atualizarUsuario, deletarUsuario };

