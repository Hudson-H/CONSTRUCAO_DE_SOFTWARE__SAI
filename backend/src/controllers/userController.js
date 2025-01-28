const userService = require('../services/userService');

const adicionarUsuario = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const result = await userService.adicionarUsuario(login, senha);
    res.status(201).json({ message: 'Usuário adicionado com sucesso.', userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar usuário.' });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await userService.listarUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

const listarUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await userService.listarUsuarioPorId(id);

    if (!usuario || usuario.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(usuario);
  } catch (err) {
    console.error('Erro ao buscar usuário:', err.message);
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
};

const loginUsuario = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const user = await userService.loginUsuario(req, login, senha);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Erro ao validar usuário.' });
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { login, senha } = req.body;

  try {
    const result = await userService.atualizarUsuario(id, login, senha);
    res.json({ message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
}

const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userService.deletarUsuario(id);
    res.json({ message: 'Usuário removido com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover usuário.' });
  }
}

module.exports = { adicionarUsuario, listarUsuarios, loginUsuario, listarUsuarioPorId, deletarUsuario, atualizarUsuario };
