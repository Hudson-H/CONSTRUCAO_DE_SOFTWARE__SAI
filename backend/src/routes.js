const express = require('express');
const session = require('express-session'); // Importe o módulo
const usuarioRoutes = require('./routes/userRoutes');
const pedidosRoutes = require('./routes/pedidoRoutes')
const funcionarioRoutes = require('./routes/employeeRoutes');
const estoqueRoutes = require('./routes/storageRoutes');
const cardapioRoutes = require('./routes/orderMenuRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');

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
app.use('/api', funcionarioRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', estoqueRoutes);
app.use('/api', cardapioRoutes);
app.use('/api', pagamentoRoutes);

module.exports = app;
