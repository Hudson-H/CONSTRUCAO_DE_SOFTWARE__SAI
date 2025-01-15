const express = require('express');
const usuarioController = require('../controllers/userController');

const router = express.Router();

router.post('/usuarios', usuarioController.adicionarUsuario);
router.get('/usuarios', usuarioController.listarUsuarios);

module.exports = router;