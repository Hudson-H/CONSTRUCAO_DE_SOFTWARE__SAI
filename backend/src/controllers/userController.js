const userService = require('../services/userService');

const adicionarUsuario = async (req, res) => {
  const { nome, email } = req.body;

  try {
    const result = await userService.adicionarUsuario(nome, email);
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

module.exports = { adicionarUsuario, listarUsuarios };
