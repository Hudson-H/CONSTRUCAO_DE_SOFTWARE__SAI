const express = require('express');
const usuarioController = require('../controllers/userController');

const router = express.Router();

router.post('/usuarios', usuarioController.adicionarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);
router.get('/usuarios/:id', usuarioController.listarUsuarioPorId);
router.delete('/usuarios/:id', usuarioController.deletarUsuario);
router.patch('/usuarios/:id', usuarioController.atualizarUsuario);


module.exports = router;