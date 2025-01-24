const express = require('express');
const storageController = require('../controllers/storageController');

const router = express.Router();

// api/estoque?idItem=<id>
router.get('/estoque', storageController.listarEstoque);
router.get('/estoque/:id', storageController.buscarEstoquePorID);
router.post('/estoque', storageController.adicionarEstoque);
router.patch('/estoque/:id', storageController.atualizarEstoque);
router.delete('/estoque/:id', storageController.deletarEstoque);

router.get('/estoque/item', storageController.listarItensEstoque);
router.get('/estoque/item/:id', storageController.buscarItemEstoquePorID);
router.post('/estoque/item', storageController.adicionarItemEstoque);
router.patch('/estoque/item/:id', storageController.atualizarItemEstoque);
router.delete('/estoque/item/:id', storageController.deletarItemEstoque);

router.get('/estoque/categoria', storageController.listarCategoriasEstoque);
router.get('/estoque/categoria/:id', storageController.buscarCategoriaEstoquePorID);
router.post('/estoque/categoria', storageController.adicionarCategoriaEstoque);
router.patch('/estoque/categoria/:id', storageController.atualizarCategoriaEstoque);
router.delete('/estoque/categoria/:id', storageController.deletarCategoriaEstoque);

module.exports = router;