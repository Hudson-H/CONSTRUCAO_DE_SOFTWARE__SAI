const employeeService = require('../services/employeeService');
const userService = require('../services/userService');
const db = require('../config/db');
const yup = require('yup');

const funcionarioSchema = yup.object().shape({
  Login: yup
  .string()
  .required()
  .max(30),
  Senha: yup
  .number()
  .integer()
  .required(),
  Pnome: yup
  .string()
  .required(),
  Unome: yup
  .string()
  .required(),
  Sexo: yup
  .string()
  .oneOf(['M', 'F'], "Sexo deve ser M ou F")
  .required(),
  Endereco: yup
  .string()
  .required(),
  CPF: yup
  .string()
  .matches(/^\d{11}$/, 'CPF deve conter 11 dígitos')
  .required(),
  Salario: yup
  .number()
  .min(0)
  .required(),
  Data_Inicio: yup
  .date()
  .typeError('A data de início deve ser uma data válida')
  .required(),
  Data_Fim: yup
  .date()
  .nullable()
  .typeError('A data de fim deve ser uma data válida ou nula'),
  Data_Inicio_Gerencia: yup
  .date()
  .nullable()
  .typeError('A data de início de gerência deve ser uma data válida ou nula'),
  Tipo: yup
  .string()
  .required()
  .oneOf(['ATENDENTE', 'GERENTE']),
  ID_Usuario: yup
  .number()
  .integer()
  .required()
});

const usuarioSchema = yup.object().shape({
  Login: yup
  .string()
  .required()
  .max(30),
  Senha: yup
  .number()
  .integer()
  .required()
});

const adicionarFuncionario = async (req, res) => {
  const dados = req.body;

  try {
    await usuarioSchema.validate({Login: dados.Login, Senha: dados.Senha}, {abortEarly: false});
  } catch (err) {
    console.error("Erro de validação de usuário:", err.errors);
    return res.status(400).json({ error: "Dados de usuário inválidos.", details: err.errors });
  }

  db.beginTransaction(); // se adicionar usuário ou adicionar funcionário não der certo, só dar um rollback no final :)

  try {
    const usuario = await userService.adicionarUsuario(dados.Login, dados.Senha);

    try {
      await funcionarioSchema.validate({...dados, ID_Usuario: usuario.insertId}, {abortEarly: false});
    } catch (err) {
      console.error("Erro de validação de funcionário:", err.errors);
      db.rollback();
      return res.status(400).json({ error: "Dados de funcionário inválidos.", details: err.errors });
    }
    
    const result = await employeeService.adicionarFuncionario({
      ...dados,
      ID_Usuario: usuario.insertId,
    });

    db.commit();
    res.status(201).json({ message: 'Funcionário adicionado com sucesso.', employeeID: result.insertId });
  } catch (err) {
    db.rollback();
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

const deletarFuncionario = async (req, res) => {
  const ID = req.params.id;

  db.beginTransaction();

  try {
    const result = await employeeService.deletarFuncionario(ID);
    res.status(201).json({ message: 'Funcionário deletado com sucesso.'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar funcionário.' });
  }
};

module.exports = { adicionarFuncionario, listarFuncionarios, buscarFuncionarioPorID, atualizarFuncionario, deletarFuncionario };
