const express = require('express');
const usuarioRoutes = require('./routes/userRoutes');
const funcionarioRoutes = require('./routes/employeeRoutes')
const estoqueRoutes = require('./routes/storageRoutes')

const app = express();

app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', funcionarioRoutes);
app.use('/api', estoqueRoutes);

module.exports = app