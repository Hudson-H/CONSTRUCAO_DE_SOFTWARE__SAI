const express = require('express');
const usuarioRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/api', usuarioRoutes);

module.exports = app