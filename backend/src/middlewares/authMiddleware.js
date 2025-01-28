// src/middlewares/authMiddleware.js

const db = require('../config/db');

const autenticarUsuario = (req, res, next) => {
  try {
    if (!req.session || !req.session.user || !req.session.user.token) {
      return res.status(401).json({ mensagem: 'Usuário não autenticado.' });
    }

    const { token, expirationTime } = req.session.user;

    const agora = new Date();
    const expiracao = new Date(expirationTime);

    if (agora > expiracao) {
      return res.status(401).json({ mensagem: 'Token expirado. Faça login novamente.' });
    }

    // Usando callback para query
    db.query('SELECT * FROM user_session WHERE token = ?', [token], (err, rows) => {
      if (err) {
        console.error('Erro ao executar a query:', err);
        return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
      }

      if (rows.length === 0) {
        return res.status(401).json({ mensagem: 'Token inválido.' });
      }

      // Se a sessão for válida, passa para o próximo middleware
      next();
    });

  } catch (err) {
    console.error('Erro no middleware de autenticação:', err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

module.exports = autenticarUsuario;
