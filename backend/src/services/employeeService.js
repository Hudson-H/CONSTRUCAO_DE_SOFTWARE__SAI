const db = require('../config/db');  // Conexão com o banco de dados

const adicionarFuncionario = (
    pnome, unome, sexo, endereco,
    CPF, salario, dataInicio, dataFim=null,
    dataInicioGerencia=null
) => {
  return new Promise((resolve, reject) => {
    const query = 
        `INSERT INTO funcionario 
        (Pnome, Unome, Sexo, Endereco, CPF, Salario, Data_Inicio, Data_Fim, Data_Inicio_Gerencia)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, 
        [pnome, unome, sexo, endereco, CPF, salario, dataInicio, dataFim, dataInicioGerencia], (err, result) => {
      if (err) {
        reject('Erro ao adicionar funcionário: ' + err);
      }
      resolve(result);
    });
  });
};

module.exports = { adicionarFuncionario };