const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importe o controlador corretamente

// Defina as rotas
router.get('/usuarios', userController.listarUsuarios); // Certifique-se de que listarUsuarios está definido no controlador
router.get('/usuarios/:id', userController.listarUsuarioPorId);
router.post('/usuarios', userController.adicionarUsuario);
router.post('/usuarios/login', userController.loginUsuario);
router.put('/usuarios/:id', userController.atualizarUsuario);
router.delete('/usuarios:id', userController.deletarUsuario);

module.exports = router;