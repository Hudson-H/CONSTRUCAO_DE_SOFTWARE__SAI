const express = require('express');
const usuarioRoutes = require('./routes/userRoutes');
const funcionarioRoutes = require('./routes/employeeRoutes')

const app = express();

app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', funcionarioRoutes);

module.exports = app