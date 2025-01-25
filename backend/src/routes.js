const express = require('express');
const session = require('express-session'); // Importe o módulo
const usuarioRoutes = require('./routes/userRoutes');

const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// Configure express-session
app.use(
  session({
    secret: 'sua-chave-secreta', // Substitua por uma string segura e aleatória
    resave: false, // Não salve a sessão novamente se nada mudou
    saveUninitialized: true, // Salve sessões não inicializadas
    cookie: {
      secure: false, // Altere para `true` se usar HTTPS
      httpOnly: true, // Torna os cookies inacessíveis ao JavaScript do lado do cliente
    },
  })
);

// Use as rotas
app.use('/api', usuarioRoutes);

module.exports = app;
