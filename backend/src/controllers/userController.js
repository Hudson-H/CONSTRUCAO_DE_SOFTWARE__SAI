const userService = require('../services/userService');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await userService.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.listarUsuarioPorId = async (req, res) => {
  try {
    const usuario = await userService.listarUsuarioPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adicionarUsuario = async (req, res) => {
  try {
    const { login, senha } = req.body;
    const novoUsuario = await userService.adicionarUsuario(login, senha);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { login, senha } = req.body;
    const resultado = await userService.loginUsuario(req, login, senha);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { login, senha } = req.body;
    const usuarioAtualizado = await userService.atualizarUsuario(id, login, senha);
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deletarUsuario(id);
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};