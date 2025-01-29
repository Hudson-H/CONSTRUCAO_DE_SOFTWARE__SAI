const express = require('express');
const storageController = require('../controllers/storageController');
const autenticarUsuario = require('../middlewares/authMiddleware');

const router = express.Router();

// api/estoque?idItem=<id>
router.get('/estoque/categoria', autenticarUsuario, storageController.listarCategoriasEstoque);
router.get('/estoque/categoria/:id', autenticarUsuario, storageController.buscarCategoriaEstoquePorID);

router.get('/estoque/item', autenticarUsuario, storageController.listarItensEstoque);
router.get('/estoque/item/:id', autenticarUsuario, storageController.buscarItemEstoquePorID);

router.get('/estoque', autenticarUsuario, storageController.listarEstoque);
router.get('/estoque/:id', autenticarUsuario, storageController.buscarEstoquePorID);
router.post('/estoque', autenticarUsuario, storageController.adicionarEstoque);
router.patch('/estoque/:id', autenticarUsuario, storageController.atualizarEstoque);
router.delete('/estoque/:id', autenticarUsuario, storageController.deletarEstoque);

router.post('/estoque/item', autenticarUsuario, storageController.adicionarItemEstoque);
router.patch('/estoque/item/:id', autenticarUsuario, storageController.atualizarItemEstoque);
router.delete('/estoque/item/:id', autenticarUsuario, storageController.deletarItemEstoque);

router.post('/estoque/categoria', autenticarUsuario, storageController.adicionarCategoriaEstoque);
router.patch('/estoque/categoria/:id', autenticarUsuario, storageController.atualizarCategoriaEstoque);
router.delete('/estoque/categoria/:id', autenticarUsuario, storageController.deletarCategoriaEstoque);

module.exports = router;