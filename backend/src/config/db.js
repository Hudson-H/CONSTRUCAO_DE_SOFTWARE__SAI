const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao obter conexão com o banco de dados:', err);
    process.exit(1);
  }
  if (connection) connection.release();
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
});

module.exports = db;
