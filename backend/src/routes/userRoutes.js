const express = require('express');
const usuarioController = require('../controllers/userController');

const router = express.Router();
const autenticarUsuario = require('../middlewares/authMiddleware');

router.patch('/usuarios/:id', autenticarUsuario, usuarioController.atualizarUsuario);
router.get('/usuarios/:id', autenticarUsuario, usuarioController.listarUsuarioPorId);
router.post('/usuarios', usuarioController.adicionarUsuario);
router.get('/usuarios', autenticarUsuario, usuarioController.listarUsuarios);
router.post('/usuarios/login', usuarioController.loginUsuario);
router.delete('/usuarios/:id', autenticarUsuario, usuarioController.deletarUsuario);

module.exports = router;
