const express = require('express');
const orderMenuController = require('../controllers/orderMenuController');

const router = express.Router();

router.get('/cardapio/composicao', orderMenuController.listarComposicao);
router.get('/cardapio/adicionados', orderMenuController.listarAdicionados);
router.get('/cardapio/item', orderMenuController.listarItensCardapio);
router.get('/cardapio/item/:id', orderMenuController.buscarItemCardapioPorID);
//GET: /cardapio/item?nome=<string> DONE!

router.get('/cardapio/secao', orderMenuController.listarSecoesCardapio);
router.get('/cardapio/secao/:id', orderMenuController.buscarSecaoCardapioPorID);

router.get('/cardapio/adicional', orderMenuController.listarAdicionaisCardapio);
router.get('/cardapio/adicional/:id', orderMenuController.buscarAdicionalCardapioPorID);

router.post('/cardapio/item', orderMenuController.adicionarItemCardapio);
router.post('/cardapio/secao', orderMenuController.adicionarSecaoCardapio);
router.post('/cardapio/adicional', orderMenuController.adicionarAdicionalCardapio);

router.patch('/cardapio/item/:id', orderMenuController.atualizarItemCardapio);

router.delete('/cardapio/item/:id', orderMenuController.deletarItemCardapio);
router.delete('/cardapio/secao/:id', orderMenuController.deletarSecaoCardapio);
router.delete('/cardapio/adicional/:id', orderMenuController.deletarAdicionalCardapio);

// router.get('/cardapio', orderMenuController.listarItensCardapio);

module.exports = router;