const employeeService = require('../services/employeeService');

const adicionarFuncionario = async (req, res) => {
  const { 
    Pnome, Unome, Sexo, Endereco, CPF, Salario, Data_Inicio, Data_Fim, Data_Inicio_Gerencia
  } = req.body;

  try {
    const result = await employeeService.adicionarFuncionario(Pnome, Unome, Sexo, Endereco, CPF, Salario, Data_Inicio, Data_Fim, Data_Inicio_Gerencia);
    res.status(201).json({ message: 'Funcionário adicionado com sucesso.', employeeID: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar funcionário.' });
  }
};

module.exports = { adicionarFuncionario };
