/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletando todas as entradas existentes
  await knex('Estoque').del();
  await knex('Adicionar').del();
  await knex('CompostoPor').del();
  await knex('Permitido').del();
  await knex('Adicional').del();
  await knex('Permissao').del();
  await knex('ItemPedido').del();
  await knex('ItemCardapio').del();
  await knex('SecaoCardapio').del()
  await knex('Pedido').del();
  await knex('Funcionario').del();
  await knex('Usuario').del();
  await knex('Item').del();
  await knex('Categoria').del();
   
 
  // Inserindo dados
  await knex('Usuario').insert([
    { Login: 'Repicolas', Senha: 100 },
    { Login: 'Pesudsson', Senha: 123 }
  ]);

  await knex('Funcionario').insert([
    { Pnome: 'Hudson', ID_Usuario: 2, Unome: 'Henrique', Sexo: 'M', Endereco: 'Rua Sarandi', CPF: '10245932148', Salario: 2000, Data_Inicio: '2025-01-01', Data_Fim: null, Data_Inicio_Gerencia: null },
    { Pnome: 'Nicolas', ID_Usuario: 1, Unome: 'Carvalho', Sexo: 'M', Endereco: 'Rua Avenícolas', CPF: '19232118230', Salario: 9000, Data_Inicio: '2024-04-30', Data_Fim: null, Data_Inicio_Gerencia: '2024-10-30' }
  ]);

  await knex('Categoria').insert([
    { Nome: 'Comida' },
    { Nome: 'Bebida' },
    { Nome: 'Objeto' }
  ]);

  await knex('Item').insert([
    { Nome: 'Pão', Descricao: 'Pãozinho usado no Hamburguer', Estrategia_Controle: null, ID_Categoria: 1 },
    { Nome: 'Alface', Descricao: 'Folhas de alface americana', Estrategia_Controle: null, ID_Categoria: 1 },
    { Nome: 'Hamburguer', Descricao: 'Hamburguer Bovino, Wagyu', Estrategia_Controle: null, ID_Categoria: 1 },
    { Nome: 'Queijo', Descricao: 'Fatiazinha de Queijo Cheddar', Estrategia_Controle: null, ID_Categoria: 1 },
    { Nome: 'Coca-Cola', Descricao: 'Latinha 400ML de Coca-Cola comum', Estrategia_Controle: null, ID_Categoria: 2 },
    { Nome: 'Tomate', Descricao: 'Tomate vermelho comprado', Estrategia_Controle: null, ID_Categoria: 1 },
    { Nome: 'Picles', Descricao: 'Picles comprado em lotes', Estrategia_Controle: null, ID_Categoria: 1 },
    { Nome: 'Maionese', Descricao: 'Maionese verde boa', Estrategia_Controle: null, ID_Categoria: 1 },
    { Nome: 'Ketchup', Descricao: 'Feito com os melhores tomates', Estrategia_Controle: null, ID_Categoria: 1 },
    { Nome: 'Mostarda', Descricao: 'Bom para HotDog', Estrategia_Controle: null, ID_Categoria: 1 },
    { Nome: 'Coca-Cola Zero', Descricao: 'Latinha 400ML de Coca-Cola Zero sem Açúcar', Estrategia_Controle: null, ID_Categoria: 2 },
    { Nome: 'Água', Descricao: 'Garrafa 500ML de Água Sem Gás (Claro)', Estrategia_Controle: null, ID_Categoria: 2 },
    { Nome: 'Sprite', Descricao: 'Latinha de Sprite', Estrategia_Controle: null, ID_Categoria: 2}
  ]);

  await knex('SecaoCardapio').insert([
    { Nome: 'Saudaveis'}
  ]);

  await knex('ItemCardapio').insert([
    { Nome: 'Hamburgao', Valor: 21.50, Descricao: 'Gostoso, carne, alface, tomate, queijo', ID_SecaoCardapio: 1 },
    { Nome: 'Água', Valor: 4, Descricao: 'Agua Geladinha', ID_SecaoCardapio: 1 }
  ]);

  await knex('CompostoPor').insert([
    { ID_Item_Cardapio: 1, ID_Item: 1, Quantidade_Composicao: 1},
    { ID_Item_Cardapio: 1, ID_Item: 2, Quantidade_Composicao: 1 },
    { ID_Item_Cardapio: 1, ID_Item: 3, Quantidade_Composicao: 2 },
    { ID_Item_Cardapio: 1, ID_Item: 4, Quantidade_Composicao: 1 },
    { ID_Item_Cardapio: 1, ID_Item: 6, Quantidade_Composicao: 1 },
    { ID_Item_Cardapio: 1, ID_Item: 8, Quantidade_Composicao: 1 },
    { ID_Item_Cardapio: 2, ID_Item: 12, Quantidade_Composicao: 1 }
  ]);

  await knex('Adicional').insert([
    { Nome: 'Queijo', Valor: 4, ID_Item: 4 },
    { Nome: 'Alface', Valor: 3.5, ID_Item: 2},
    { Nome: 'Hamburguer', Valor: 10, ID_Item: 3},
    { Nome: 'Tomate', Valor: 3.5, ID_Item: 6 },
    { Nome: 'Picles', Valor: 2, ID_Item: 7  },
    { Nome: 'Pão', Valor: 3, ID_Item: 1 }
  ]);

  await knex('Estoque').insert([
    { Quantidade: 10, Data_Compra: '2025-01-01', Data_Validade: '2025-02-01', ID_Item: 1 },
    { Quantidade: 20, Data_Compra: '2025-01-10', Data_Validade: '2025-01-30', ID_Item: 2 },
    { Quantidade: 20, Data_Compra: '2024-12-30', Data_Validade: '2025-02-10', ID_Item: 3 },
    { Quantidade: 3, Data_Compra: '2020-01-10', Data_Validade: '2020-01-30', ID_Item: 4 },
    { Quantidade: 10, Data_Compra: '2025-02-22', Data_Validade: '2025-03-30', ID_Item: 4 },
    { Quantidade: 30, Data_Compra: '2025-01-10', Data_Validade: '2025-01-30', ID_Item: 6 },
    { Quantidade: 100, Data_Compra: '2024-12-15', Data_Validade: '2025-06-30', ID_Item: 8 }
  ]);

  await knex('Permissao').insert([
    { Nome: 'Estoque', Descricao: 'Permissao para realizar alteracoes no estoque' },
    { Nome: 'Funcionario', Descricao: 'Permissao para criar e editar alterações de funcionarios' },
    { Nome: 'Pedido', Descricao: 'Permissao para fazer pedidos' }
  ]);

  await knex('Permitido').insert([
    { idPermissao: 1, idUsuario: 1 },
    { idPermissao: 2, idUsuario: 1 },
    { idPermissao: 3, idUsuario: 1 },
    { idPermissao: 1, idUsuario: 2 },
    { idPermissao: 2, idUsuario: 2 }
  ]);

  await knex('Pedido').insert([
    {
      Senha: 123,                    // Senha
      Valor: 150.75,                 // Valor
      Data_Pedido: '2025-01-27',     // Data_Pedido
      Estado: 1,                     // Estado
      Informacoes: 'Pedido especial',// Informacoes
      ID_Pagamento: 456,             // ID_Pagamento
      Data_Emissao_Pagamento: '2025-01-27', // Data_Emissao_Pagamento
      Data_Pagamento: '2025-01-28',  // Data_Pagamento
      Forma_Pagamento: 'Cartão de Crédito', // Forma_Pagamento
      Valor_Total: 150.75,           // Valor_Total
      Valor_Pago: 150.75,            // Valor_Pago
      Troco: 0.00,                   // Troco
      idAtendente: 1                 // idAtendente
    },
    {
      Senha: 110,                    // Senha
      Valor: 10.10,                 // Valor
      Data_Pedido: '2025-01-20',     // Data_Pedido
      Estado: 1,                     // Estado
      Informacoes: 'Pedido Nao Especial',// Informacoes
      ID_Pagamento: 40,             // ID_Pagamento
      Data_Emissao_Pagamento: '2025-01-20', // Data_Emissao_Pagamento
      Data_Pagamento: '2025-01-20',  // Data_Pagamento
      Forma_Pagamento: 'Cartão de Débito', // Forma_Pagamento
      Valor_Total: 10.10,           // Valor_Total
      Valor_Pago: 10.10,            // Valor_Pago
      Troco: 0.00,                   // Troco
      idAtendente: 1                 // idAtendente
    }
  ]);

  await knex('ItemPedido').insert([
    { ID_Pedido: 1},
    { ID_Pedido: 1},
    { ID_Pedido: 1},
    { ID_Pedido: 2}
  ]);

  await knex('Adicionar').insert([
    {
      ID_Item_Pedido: 1,       // ID_Item_Pedido
      ID_Item_Cardapio: 1,     // ID_Item_Cardapio
      ID_Adicional: 1,         // ID_Adicional
      Quantidade_Adicional: 2  // Quantidade_Adicional
    },
    {
      ID_Item_Pedido: 2,       // ID_Item_Pedido
      ID_Item_Cardapio: 1,     // ID_Item_Cardapio
      ID_Adicional: null,      // ID_Adicional (null permitido)
      Quantidade_Adicional: 0  // Quantidade_Adicional
    },
    {
      ID_Item_Pedido: 4,       // ID_Item_Pedido
      ID_Item_Cardapio: 2,     // ID_Item_Cardapio
      ID_Adicional: null,      // ID_Adicional (null permitido)
      Quantidade_Adicional: 0  // Quantidade_Adicional
    }
  ]);
};

