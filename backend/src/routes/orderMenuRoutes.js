const express = require('express');
const autenticarUsuario = require('../middlewares/authMiddleware');
const orderMenuController = require('../controllers/orderMenuController');

const router = express.Router();

router.patch('/cardapio/teste/:id', autenticarUsuario, orderMenuController.atualizarEstoqueAposPedido);

router.get('/cardapio/adicionar/:id', autenticarUsuario, orderMenuController.buscarAdicionarPorID);
router.patch('/cardapio/adicionar/:id', autenticarUsuario, orderMenuController.atualizarAdicionar);
router.post('/cardapio/adicionar', autenticarUsuario, orderMenuController.adicionarAdicionar);
router.delete('/cardapio/adicionar/:id', autenticarUsuario, orderMenuController.deletarAdicionar);

router.get('/cardapio/composicao', autenticarUsuario, orderMenuController.listarComposicao);
router.get('/cardapio/adicionados', autenticarUsuario, orderMenuController.listarAdicionados);
router.get('/cardapio/item', autenticarUsuario, orderMenuController.listarItensCardapio);
router.get('/cardapio/item/:id', autenticarUsuario, orderMenuController.buscarItemCardapioPorID);
//GET: /cardapio/item?nome=<string> DONE!

router.get('/cardapio/secao', autenticarUsuario, orderMenuController.listarSecoesCardapio);
router.get('/cardapio/secao/:id', autenticarUsuario, orderMenuController.buscarSecaoCardapioPorID);

router.get('/cardapio/adicional', autenticarUsuario, orderMenuController.listarAdicionaisCardapio);
router.get('/cardapio/adicional/:id', autenticarUsuario, orderMenuController.buscarAdicionalCardapioPorID);

router.post('/cardapio/item', autenticarUsuario, orderMenuController.adicionarItemCardapio);
router.post('/cardapio/secao', autenticarUsuario, orderMenuController.adicionarSecaoCardapio);
router.post('/cardapio/adicional', autenticarUsuario, orderMenuController.adicionarAdicionalCardapio);

router.patch('/cardapio/item/:id', autenticarUsuario, orderMenuController.atualizarItemCardapio);

router.delete('/cardapio/item/:id', autenticarUsuario, orderMenuController.deletarItemCardapio);
router.delete('/cardapio/secao/:id', autenticarUsuario, orderMenuController.deletarSecaoCardapio);
router.delete('/cardapio/adicional/:id', autenticarUsuario, orderMenuController.deletarAdicionalCardapio);


// router.get('/cardapio', autenticarUsuario, orderMenuController.listarItensCardapio);

module.exports = router;