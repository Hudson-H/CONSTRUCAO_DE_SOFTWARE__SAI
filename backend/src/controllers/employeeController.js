const employeeService = require('../services/employeeService');

const adicionarFuncionario = async (req, res) => {
  const dados = req.body;

  try {
    const result = await employeeService.adicionarFuncionario(dados);
    res.status(201).json({ message: 'Funcionário adicionado com sucesso.', employeeID: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar funcionário.' });
  }
};

const listarFuncionarios = async (req, res) => {
  try {
    const funcionarios = await employeeService.listarFuncionarios();
    res.json(funcionarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar funcionários.' });
  }
};

const buscarFuncionarioPorID = async (req, res) => {
  const ID = req.params.id;

  try {
    const funcionario = await employeeService.buscarFuncionarioPorID(ID);
    res.json(funcionario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar funcionário.' });
  }
};

const atualizarFuncionario = async (req, res) => {
  const ID = req.params.id;
  const dados = req.body;

  try {
    const result = await employeeService.atualizarFuncionario(ID, dados);
    res.status(201).json({ message: 'Funcionário atualizado com sucesso.'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar funcionário.' });
  }
};

module.exports = { adicionarFuncionario, listarFuncionarios, buscarFuncionarioPorID, atualizarFuncionario };
