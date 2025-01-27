const express = require('express');
const usuarioRoutes = require('./routes/userRoutes');
const pedidosRoutes = require('./routes/pedidoRoutes')
const funcionarioRoutes = require('./routes/employeeRoutes');
const estoqueRoutes = require('./routes/storageRoutes');
const cardapioRoutes = require('./routes/orderMenuRoutes');

const app = express();

app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', funcionarioRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', estoqueRoutes);
app.use('/api', cardapioRoutes);

module.exports = app