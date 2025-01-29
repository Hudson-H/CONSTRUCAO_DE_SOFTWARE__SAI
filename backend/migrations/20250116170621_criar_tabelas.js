/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema
        .createTable('Pedido', (table) => {
            table.increments('ID').primary();
            table.integer('Senha');
            table.float('Valor');
            table.date('Data_Pedido');
            table.integer('Estado');
            table.string('Informacoes', 100);
            table.integer('ID_Pagamento');
            table.date('Data_Emissao_Pagamento');
            table.date('Data_Pagamento');
            table.string('Forma_Pagamento', 30);
            table.float('Valor_Total');
            table.float('Valor_Pago');
            table.float('Troco');
            table.integer('idAtendente').unsigned();
        })
        .then(() => {
            return knex.schema.createTable('ItemPedido', (table) => {
                table.increments('ID_Item_Pedido').primary();
                table.integer('ID_Pedido').unsigned().notNullable();
            });
        })
        .then(() => {
            return knex.schema.createTable('ItemCardapio', (table) => {
                table.string('Nome', 30);
                table.increments('ID').primary();
                table.float('Valor');
                table.string('Descricao', 100);
                table.integer('ID_SecaoCardapio').unsigned();
            });
        })
        .then(() => {
            return knex.schema.createTable('SecaoCardapio', (table) => {
                table.increments('ID').primary();
                table.string('Nome', 30);
            });
        })
        .then(() => {
            return knex.schema.createTable('Item', (table) => {
                table.increments('ID').primary();
                table.string('Nome', 30);
                table.string('Descricao', 100);
                table.integer('Estrategia_Controle');
                table.integer('ID_Categoria').unsigned();
            });
        })
        .then(() => {
            return knex.schema.createTable('Categoria', (table) => {
                table.increments('ID').primary();
                table.string('Nome', 30);
            });
        })
        .then(() => {
            return knex.schema.createTable('Estoque', (table) => {
                table.increments('ID').primary();
                table.integer('Quantidade');
                table.date('Data_Compra');
                table.date('Data_Validade');
                table.integer('ID_Item').unsigned();
            });
        })
        .then(() => {
            return knex.schema.createTable('Permissao', (table) => {
                table.string('Descricao', 100);
                table.string('Nome', 30);
                table.increments('ID').primary();
            });
        })
        .then(() => {
            return knex.schema.createTable('Adicional', (table) => {
                table.increments('ID').primary();
                table.string('Nome', 30);
                table.float('Valor');
                table.integer('ID_Item').unsigned();        
            });
        })
        .then(() => {
            return knex.schema.createTable('Usuario', (table) => {
                table.increments('ID').primary();
                table.string('Login', 30);
                table.integer('Senha');
            });
        })
        .then(() => {
            return knex.schema.createTable('Funcionario', (table) => {
                table.string('Pnome', 30);
                table.increments('ID_Usuario').primary();
                table.string('Unome', 30);
                table.string('Sexo', 10);
                table.string('Endereco', 100);
                table.string('CPF', 11);
                table.float('Salario');
                table.date('Data_Inicio');
                table.date('Data_Fim');
                table.date('Data_Inicio_Gerencia');
            });
        })
        .then(() => {
            return knex.schema.createTable('Permitido', (table) => {
                table.integer('idPermissao').unsigned().notNullable();
                table.integer('idUsuario').unsigned().notNullable();
                table.primary(['idPermissao', 'idUsuario']);
            });
        })
        .then(() => {
            return knex.schema.createTable('Adicionar', (table) => {
                table.integer('ID_Item_Pedido').unsigned().notNullable();
                table.integer('ID_Item_Cardapio').unsigned();
                table.integer('ID_Adicional').unsigned();
                table.integer('Quantidade_Adicional');
                table.primary(['ID_Item_Pedido']);
            });
        })
        .then(() => {
            return knex.schema.createTable('CompostoPor', (table) => {
                table.integer('ID_Item_Cardapio').unsigned().notNullable();
                table.integer('ID_Item').unsigned().notNullable();
                table.integer('Quantidade_Composicao').notNullable();
                table.primary(['ID_Item_Cardapio', 'ID_Item']);
            });
        })
        .then(() => {
            return knex.schema
                .table('Pedido', (table) => {
                    table.foreign('idAtendente').references('Funcionario.ID_Usuario');
                })
                .table('ItemPedido', (table) => {
                    table.foreign('ID_Pedido').references('Pedido.ID');
                })
                .table('ItemCardapio', (table) => {
                    table.foreign('ID_SecaoCardapio').references('SecaoCardapio.ID');
                })
                .table('Item', (table) => {
                    table.foreign('ID_Categoria').references('Categoria.ID');
                })
                .table('Estoque', (table) => {
                    table.foreign('ID_Item').references('Item.ID');
                })
                .table('Adicional', (table) => {
                    table.foreign('ID_Item').references('Item.ID');
                })
                .table('Funcionario', (table) => {
                    table.foreign('ID_Usuario').references('Usuario.ID');
                })
                .table('Permitido', (table) => {
                    table.foreign('idPermissao').references('Permissao.ID');
                    table.foreign('idUsuario').references('Usuario.ID');
                })
                .table('Adicionar', (table) => {
                    table.foreign('ID_Item_Pedido').references('ItemPedido.ID_Item_Pedido');
                    table.foreign('ID_Item_Cardapio').references('ItemCardapio.ID');
                    table.foreign('ID_Adicional').references('Adicional.ID');
                })
                .table('CompostoPor', (table) => {
                    table.foreign('ID_Item_Cardapio').references('ItemCardapio.ID');
                    table.foreign('ID_Item').references('Item.ID');
                });
        });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('Estoque')
        .dropTableIfExists('Adicionar')
        .dropTableIfExists('CompostoPor')
        .dropTableIfExists('Permitido')
        .dropTableIfExists('Adicional')
        .dropTableIfExists('Permissao')
        .dropTableIfExists('ItemPedido')
        .dropTableIfExists('ItemCardapio')
        .dropTableIfExists('SecaoCardapio')
        .dropTableIfExists('Pedido')
        .dropTableIfExists('Funcionario')
        .dropTableIfExists('Usuario')
        .dropTableIfExists('Item')
        .dropTableIfExists('Categoria');
};