const db = require('../config/db');  // Conexão com o banco de dados

// adiciona um funcionário ao banco
const adicionarFuncionario = (dados) => {
  return new Promise((resolve, reject) => {

    const query = 
      `INSERT INTO Funcionario (
        Login,
        Senha,
        Pnome,
        Unome,
        Sexo,
        Endereco,
        CPF,
        Salario,
        Data_Inicio,
        Data_Fim,
        Data_Inicio_Gerencia,
        Tipo,
        ID_Usuario
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    db.query(query, [
      dados["Login"],
      dados["Senha"],
      dados["Pnome"],
      dados["Unome"],
      dados["Sexo"],
      dados["Endereco"],
      dados["CPF"],
      dados["Salario"],
      dados["Data_Inicio"],
      dados["Data_Fim"],
      dados["Data_Inicio_Gerencia"],
      dados["Tipo"],
      dados["ID_Usuario"]
    ], (err, result) => {
      if (err) {
        reject('Erro ao adicionar funcionário: ' + err);
      } else {
        resolve(result);
      }
    });
  });
};

// lista todos os funcionários no banco
const listarFuncionarios = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM Funcionario', (err, results) => {
      if (err) {
        reject('Erro ao buscar usuários: ' + err);
      }
      resolve(results);
    });
  });
};

//  busca um funcionário específico por ID
const buscarFuncionarioPorID = (ID) => {
  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM Funcionario WHERE ID_Usuario = ?`;
    db.query(query, [ID], (err, results) => {
      if (err) {
        reject('Erro ao buscar usuários: ' + err);
      }
      resolve(results);
    });
  });
};

// atualiza os dados de um funcionário no banco
const atualizarFuncionario = (ID, dados) => {
  return new Promise((resolve, reject) => {
    const campos = [];
    const valores = [];

    Object.keys(dados).forEach((campo) => {
      campos.push(`${campo} = ?`);
      valores.push(dados[campo]);
    });

    valores.push(ID);

    const query = `UPDATE Funcionario SET ${campos.join(', ')} WHERE ID_USUARIO = ?`;
    db.query(query, valores, (err, results) => {
      if (err) {
        reject('Erro ao atualizar funcionário: ' + err);
      }
      resolve(results);
    });
  });
};

const deletarFuncionario = (ID) => {
  return new Promise((resolve, reject) => {
    const query1 = 'UPDATE pedido SET idAtendente = NULL WHERE idAtendente = ?';

    db.query(query1, [ID], (err, results) => {
      if (err) {
        reject('Erro ao desvincular funcionário do pedido: ' + err);
      }
      resolve(results);
    });

    const query2 = `DELETE FROM Funcionario WHERE ID_Usuario = ?`;
    db.query(query2, [ID], (err, results) => {
      if (err) {
        reject('Erro ao deletar usuário: ' + err);
      }
      resolve(results);
    });
  });
};


module.exports = { adicionarFuncionario, listarFuncionarios, buscarFuncionarioPorID, atualizarFuncionario, deletarFuncionario };