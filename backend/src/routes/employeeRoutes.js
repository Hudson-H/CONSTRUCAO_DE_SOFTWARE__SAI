const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

router.post('/funcionarios', employeeController.adicionarFuncionario);

module.exports = router;