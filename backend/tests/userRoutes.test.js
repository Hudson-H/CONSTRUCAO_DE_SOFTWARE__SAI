const request = require('supertest'); // Para realizar requisições
const routes = require('../src/routes'); // Importa o app sem listen
const db = require('../src/config/db');

let server;

describe('Testes do endpoint GET /usuarios', () => {
  // Antes de todos os testes, inicia o servidor
  beforeAll(() => {
    server = routes.listen(3000, () => {
      console.log('Servidor iniciado para os testes');
    });
  });

  // Depois de todos os testes, encerra o servidor
  afterAll(() => {
    server.close();
    db.end();
  });

  it('Deve retornar todos os usuários com status 200', async () => {
    const response = await request(server).get('/api/usuarios');
    expect(response.status).toBe(200);
    // Adicione outras validações conforme necessário
  });
});
