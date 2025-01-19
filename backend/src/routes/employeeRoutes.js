const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/funcionarios', employeeController.listarFuncionarios);
router.get('/funcionarios/:id', employeeController.buscarFuncionarioPorID);
router.post('/funcionarios', employeeController.adicionarFuncionario);
router.patch('/funcionarios/:id', employeeController.atualizarFuncionario);

module.exports = router;