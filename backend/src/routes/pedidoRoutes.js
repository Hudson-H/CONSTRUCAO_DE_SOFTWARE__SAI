const express = require('express');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.get('/pedidos/:id', pedidoController.listarPedidoPorId);
router.patch('/pedidos/:id', pedidoController.atualizarPedido);
router.delete('/pedidos/:id', pedidoController.deletarPedido);
router.post('/pedidos', pedidoController.adicionarPedido);
router.get('/pedidos', pedidoController.listarPedidos);

module.exports = router;