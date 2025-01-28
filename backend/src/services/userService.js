const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class UserService {
  async adicionarUsuario(login, senha) {
    return await userRepository.adicionarUsuario(login, senha);
  }

  async listarUsuarios() {
    return await userRepository.listarUsuarios();
  }

  async loginUsuario(req, login, senha) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiration_time = new Date(Date.now() + 86400000);
    const formattedExpirationTime = expiration_time.toISOString().slice(0, 19).replace('T', ' ');

    const user = await userRepository.buscarUsuarioPorLogin(login);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      throw new Error('Senha incorreta.');
    }

    await userRepository.adicionarTokenTabela(user.id, token, formattedExpirationTime);

    if (req.session) {
      req.session.user = {
        id: user.id,
        token: token,
        expirationTime: formattedExpirationTime,
      };
    } else {
      throw new Error('Erro interno: sessão não inicializada.');
    }

    return {
      id: user.id,
      token: token,
      expirationTime: formattedExpirationTime,
    };
  }

  async listarUsuarioPorId(id) {
    return await userRepository.buscarUsuarioPorId(id);
  }

  async atualizarUsuario(id, login, senha) {
    return await userRepository.atualizarUsuario(id, login, senha);
  }

  async deletarUsuario(id) {
    return await userRepository.deletarUsuario(id);
  }
}

module.exports = new UserService();