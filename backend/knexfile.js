// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2', // Use o cliente MySQL2
    connection: {
      host: 'localhost', // Host do seu servidor MySQL
      user: 'root', // Usuário do banco
      password: 'password', // Senha do banco
      database: 'sai', // Nome do banco de dados
    },
    migrations: {
      directory: './migrations', // Diretório para as migrações
    },
    seeds: {
      directory: './seeds', // Diretório para os seeds (opcional)
    },
  },
  

};
