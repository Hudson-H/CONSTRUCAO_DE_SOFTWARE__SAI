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
    const query = 'SELECT * FROM Usuario WHERE id = ?'; // Placeholder seguro para o parâmetro
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

const deletarUsuario = async (id) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) return reject('Erro ao iniciar transação: ' + err);

      const query1 = 'DELETE FROM Permitido WHERE idUsuario = ?';
      db.query(query1, [id], (err) => {
        if (err) {
          return db.rollback(() => {
            reject('Erro ao deletar registros dependentes na tabela Permitido: ' + err);
          });
        }

        const query2 = 'DELETE FROM Funcionario WHERE ID_Usuario = ?';
        db.query(query2, [id], (err) => {
          if (err) {
            return db.rollback(() => {
              reject('Erro ao deletar registros dependentes na tabela Funcionario: ' + err);
            });
          }

          const query3 = 'DELETE FROM Usuario WHERE ID = ?';
          db.query(query3, [id], (err) => {
            if (err) {
              return db.rollback(() => {
                reject('Erro ao deletar usuário: ' + err);
              });
            }

            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  reject('Erro ao confirmar transação: ' + err);
                });
              }
              resolve({ message: 'Usuário e dependências deletados com sucesso.' });
            });
          });
        });
      });
    });
  });
};

const atualizarUsuario = (id, nome, email) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE Usuario SET Login = ?, Senha = ? WHERE id = ?';
    db.query(query, [nome, email, id], (err, results) => {
      if (err) {
        return reject('Erro ao atualizar usuário: ' + err);
      }
      resolve(results);
    });
  });
}

module.exports = { adicionarUsuario, listarUsuarios, listarUsuarioPorId, deletarUsuario, atualizarUsuario };
