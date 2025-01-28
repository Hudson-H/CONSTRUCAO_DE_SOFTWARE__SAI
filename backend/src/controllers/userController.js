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

const listarUsuarioPorId = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    const usuario = await userService.listarUsuarioPorId(userId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json(usuario);
  } catch (err) {
    console.error('Erro ao buscar usuário por ID:', err.message);
    res.status(500).json({ error: 'Erro interno ao buscar usuário.' });
  }
};

const deletarUsuario = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    const usuario = await userService.listarUsuarioPorId(userId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }


    await userService.deletarUsuario(userId);

    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    res.status(500).json({ error: 'Erro interno ao deletar usuário.' });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const userId = req.params.id;
    const { nome, email } = req.body;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    const usuario = await userService.listarUsuarioPorId(userId);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    await userService.atualizarUsuario(userId, nome, email);

    res.status(200).json({ message: 'Usuário atualizado com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err.message);
    res.status(500).json({ error: 'Erro interno ao atualizar usuário.' });
  }
}

module.exports = { adicionarUsuario, listarUsuarios, listarUsuarioPorId, deletarUsuario, atualizarUsuario };
