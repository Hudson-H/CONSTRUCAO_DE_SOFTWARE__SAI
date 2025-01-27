const express = require('express');
const pagamentoController = require('../controllers/pagamentoController');

const router = express.Router();

router.patch('/pedidos/pagamentos/:id', pagamentoController.adicionarPagamento);

module.exports = router;