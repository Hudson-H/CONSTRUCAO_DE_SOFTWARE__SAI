const express = require('express');
const usuarioController = require('../controllers/userController');

const router = express.Router();

router.patch('/usuarios/:id', usuarioController.atualizarUsuario);
router.get('/usuarios/:id', usuarioController.listarUsuarioPorId);
router.post('/usuarios', usuarioController.adicionarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);
router.post('/usuarios/login', usuarioController.loginUsuario);

module.exports = router;