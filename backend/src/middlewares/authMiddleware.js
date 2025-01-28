const autenticarUsuario = async (req, res, next) => {
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

    const [sessao] = await db.query('SELECT * FROM Sessions WHERE token = ?', [token]);

    if (sessao.length === 0) {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }

    next();
  } catch (err) {
    console.error('Erro no middleware de autenticação:', err);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};