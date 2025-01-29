//@ts-check
const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const beginTransaction = () => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        return reject('Erro ao iniciar a transação.');
      }
      resolve();
    });
  });
};

const commitTransaction = () => {
  return new Promise((resolve, reject) => {
    db.commit((err) => {
      if (err) {
        return reject('Erro ao finalizar a transação.');
      }
      resolve();
    });
  });
};

const rollbackTransaction = () => {
  return new Promise((resolve, reject) => {
    db.rollback(() => {
      resolve();
    });
  });
};

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

module.exports = {
  db,
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
};