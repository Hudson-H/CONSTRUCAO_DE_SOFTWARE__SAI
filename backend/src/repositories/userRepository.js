const db = require('../config/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class UserRepository {
  async adicionarUsuario(login, senha) {
    const hashedSenha = await bcrypt.hash(senha, 10);
    const query = 'INSERT INTO Usuario (login, senha) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
      db.query(query, [login, hashedSenha], (err, result) => {
        if (err) return reject('Erro ao adicionar usuário: ' + err);
        resolve(result);
      });
    });
  }

  async listarUsuarios() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Usuario', (err, results) => {
        if (err) return reject('Erro ao buscar usuários: ' + err);
        resolve(results);
      });
    });
  }

  async buscarUsuarioPorLogin(login) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Usuario WHERE login = ?', [login], (err, results) => {
        if (err) return reject('Erro ao buscar usuário: ' + err);
        resolve(results[0]);
      });
    });
  }

  async buscarUsuarioPorId(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Usuario WHERE id = ?', [id], (err, results) => {
        if (err) return reject('Erro ao buscar usuário: ' + err);
        resolve(results[0]);
      });
    });
  }

  async atualizarUsuario(id, login, senha) {
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

    return new Promise((resolve, reject) => {
      db.query(query, params, (err, result) => {
        if (err) return reject('Erro ao atualizar usuário: ' + err);
        resolve(result);
      });
    });
  }

  async deletarUsuario(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Usuario WHERE id = ?', [id], (err, result) => {
        if (err) return reject('Erro ao deletar usuário: ' + err);
        resolve(result);
      });
    });
  }

  async adicionarTokenTabela(user_id, token, expiration_time) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO user_session (user_id, token, expiration_time) VALUES (?, ?, ?)';
      db.query(query, [user_id, token, expiration_time], (err, result) => {
        if (err) return reject('Erro ao adicionar token: ' + err);
        resolve(result);
      });
    });
  }
}

module.exports = new UserRepository();