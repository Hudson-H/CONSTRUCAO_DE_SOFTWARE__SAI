const express = require('express');
const usuarioRoutes = require('./routes/userRoutes');
const servicoRoutes = require('./routes/pedidoRoutes');

const app = express();

app.use(express.json());

app.use('/api', usuarioRoutes);
app.use('/api', servicoRoutes)
module.exports = app