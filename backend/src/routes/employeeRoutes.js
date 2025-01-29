const express = require('express');
const autenticarUsuario = require('../middlewares/authMiddleware');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.get('/funcionarios', autenticarUsuario, employeeController.listarFuncionarios);
router.get('/funcionarios/:id', autenticarUsuario, employeeController.buscarFuncionarioPorID);
router.post('/funcionarios', autenticarUsuario, employeeController.adicionarFuncionario);
router.patch('/funcionarios/:id', autenticarUsuario, employeeController.atualizarFuncionario);
router.delete('/funcionarios/:id', autenticarUsuario,employeeController.deletarFuncionario);


module.exports = router;