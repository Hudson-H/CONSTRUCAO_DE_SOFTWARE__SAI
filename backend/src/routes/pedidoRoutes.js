const express = require('express');
const autenticarUsuario = require('../middlewares/authMiddleware');
const pedidoController = require('../controllers/pedidoController');

const router = express.Router();

router.get('/pedidos/:id', autenticarUsuario, pedidoController.listarPedidoPorId);
router.patch('/pedidos/:id', autenticarUsuario, pedidoController.atualizarPedido);
router.delete('/pedidos/:id', autenticarUsuario, pedidoController.deletarPedido);
router.post('/pedidos', autenticarUsuario, pedidoController.adicionarPedido);
router.get('/pedidos', autenticarUsuario, pedidoController.listarPedidos);

router.get('/pedidos/item/:id', autenticarUsuario, pedidoController.buscarItemPedidoPorID);
router.patch('/pedidos/item/:id', autenticarUsuario, pedidoController.atualizarItemPedido);
router.delete('/pedidos/item/:id', autenticarUsuario, pedidoController.deletarItemPedido);
router.post('/pedidos/item', autenticarUsuario,  pedidoController.adicionarItemPedido);

module.exports = router;