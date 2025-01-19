const userService = require('../services/userService');

const adicionarUsuario = async (req, res) => {
  const { Login, Senha } = req.body;

  try {
    const result = await userService.adicionarUsuario(Login, Senha);
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
    res.status(500).json({ error: 'Erro ao listar usuários.' });
  }
};

module.exports = { adicionarUsuario, listarUsuarios };
