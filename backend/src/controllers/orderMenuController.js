const orderMenuService = require('../services/orderMenuService');
const { db, beginTransaction, commitTransaction, rollbackTransaction } = require('../config/db');  // Conexão com o banco de dados


const listarComposicao = async (req, res) => {
  const { id_item_cardapio, id_item } = req.query;

  try {
    // Criação de um objeto que vai passar o parâmetro relevante para o serviço
    const params = {};

    if (id_item_cardapio) params.idItemCardapio = id_item_cardapio;
    if (id_item) params.idItem = id_item;

    const composicao = await orderMenuService.listarComposicao(params);
    res.json(composicao);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar Composicao.' });
  }
};

const listarAdicionados = async (req, res) => {
    const {id_item_pedido, id_item_cardapio, id_adicional } = req.query;
  
    try {
      // Criação de um objeto que vai passar o parâmetro relevante para o serviço
      const params = {};
        
      if (id_item_pedido) params.idItemPedido = id_item_pedido;
      if (id_item_cardapio) params.idItemCardapio = id_item_cardapio;
      if (id_adicional) params.idAdicional = id_adicional;
  
      const adicionados = await orderMenuService.listarAdicionados(params);

      res.json(adicionados);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar Adicionados.' });
    }
  };


  const listarItensCardapio = async (req, res) => {
    const { id_secaocardapio, nome } = req.query;
  
    try {
      // Criação de um objeto que vai passar o parâmetro relevante para o serviço
      const params = {};
        
      if (id_secaocardapio) params.idSecaoCardapio = id_secaocardapio;
      if (nome) params.nome = nome;
      
  
      const itens = await orderMenuService.listarItensCardapio(params);

      res.json(itens);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar Itens Cardapio.' });
    }
  };
  
  const listarSecoesCardapio = async (req, res) => {

    try {
      // Criação de um objeto que vai passar o parâmetro relevante para o serviço
  
      const secoes = await orderMenuService.listarSecoesCardapio();

      res.json(secoes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar Secoes Cardapio.' });
    }
  };

const buscarItemCardapioPorID = async (req, res) => {
  const ID = req.params.id;
  try {
    const itemMenu = await orderMenuService.buscarItemCardapioPorID(ID);
    res.json(itemMenu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar ItemCardapio.' });
  }
};

const buscarAdicionarPorID = async (req, res) => {
  const ID = req.params.id;
  try {
    const adicionar = await orderMenuService.buscarAdicionarPorID(ID);
    res.json(adicionar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar Adicionar.' });
  }
};

const adicionarAdicionar = async (req, res) => {
  const dados = req.body;

  try {
    const result = await orderMenuService.adicionarAdicionar(dados);
    res.status(201).json({ message: 'Adicional do Cardapio adicionado ao pedido com sucesso.', adicionarID: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar Adicional no pedido.'});
  }
};


const adicionarItemCardapio = async (req, res) => {
    const dados = req.body;
  
    try {
      const result = await orderMenuService.adicionarItemCardapio(dados);
      res.status(201).json({ message: 'Item Cardapio adicionado com sucesso.', itemMenuID: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao adicionar ItemCardapio.'});
    }
  };

  //tem que fazer ainda, listarAdicionados, ver "Adicionar" que tem essa chave.
  const deletarItemCardapio = async (req, res) => {
    try {
      const itemMenuId = req.params.id;
  
      if (!itemMenuId || isNaN(itemMenuId)) {
        return res.status(400).json({ error: 'ID inválido fornecido.' });
      }
  
      const itemMenu = await orderMenuService.buscarItemCardapioPorID(itemMenuId);
  
      if (!itemMenu) {
        return res.status(404).json({ error: 'Item Cardapio não encontrado.' });
      }

      const composicao = await orderMenuService.listarComposicao({idItemCardapio: itemMenuId})
      
      if (composicao.length > 0) {
        await orderMenuService.removerComposicaoPorItemCardapio(itemMenuId);
        // return res.status(400).json({
        //     error: 'Não é possível deletar o item do cardapio, pois ele está conectado a outros itens',
        // });
      }

      const adicionados = await orderMenuService.listarAdicionados({idItemCardapio: itemMenuId})
      
      if (adicionados.length > 0) {
        await orderMenuService.removerItemCardapioAdicionar(itemMenuId);
        // return res.status(400).json({
        //     error: 'Não é possível deletar o item do cardapio, pois ele está conectado a adicionais e ItemPedido',
        // });
      }
  

      await orderMenuService.deletarItemCardapio(itemMenuId);
  
      res.status(200).json({ message: 'Item do Cardapio deletado com sucesso.' });
    } catch (err) {
      console.error('Erro ao deletar Item do Cardapio:', err.message);
      res.status(500).json({ error: 'Erro interno ao deletar ItemCardapio.' });
    }
  };

const buscarSecaoCardapioPorID = async (req, res) => {
    const ID = req.params.id;
    try {
      const sectionMenu = await orderMenuService.buscarSecaoCardapioPorID(ID);
      res.json(sectionMenu);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar SecaoCardapio.' });
    }
};
  

const adicionarSecaoCardapio = async (req, res) => {
    const dados = req.body;
  
    try {
      const result = await orderMenuService.adicionarSecaoCardapio(dados);
      res.status(201).json({ message: 'Secao Cardapio adicionada com sucesso.', sectionMenuID: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao adicionar SecaoCardapio.'});
    }
};


  const listarAdicionaisCardapio = async (req, res) => {
    // const {id_secaocardapio } = req.query;
  
    try {
      // Criação de um objeto que vai passar o parâmetro relevante para o serviço
      // const params = {};
        
      //if (id_secaocardapio) params.idSecaoCardapio = id_secaocardapio;
      
      const adicionais = await orderMenuService.listarAdicionaisCardapio();

      res.json(adicionais);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar Adicionais Cardapio.' });
    }
  };

  
const buscarAdicionalCardapioPorID = async (req, res) => {
    const ID = req.params.id;
    try {
      const additionalMenu = await orderMenuService.buscarAdicionalCardapioPorID(ID);
      res.json(additionalMenu);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar Adicional do Cardapio.' });
    }
};

const adicionarAdicionalCardapio = async (req, res) => {
    const dados = req.body;
  
    try {
      const result = await orderMenuService.adicionarAdicionalCardapio(dados);
      res.status(201).json({ message: 'Adicional do Cardapio adicionado com sucesso.', additionalMenuID: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao adicionar AdicionalCardapio.'});
    }
};

const atualizarAdicionar= async (req, res) => {
  const ID = req.params.id;
  const dados = req.body;

  
  try {
    if (!ID || isNaN(ID)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }
    const adicionar = await orderMenuService.buscarAdicionarPorID(ID);
    if (!adicionar) {
      return res.status(404).json({ error: 'Item do Cardapio não encontrado.' });
    }
    const result = await orderMenuService.atualizarAdicionar(ID, dados);
    res.status(201).json({ message: 'Item do Cardapio atualizado com sucesso.'});
  } 
  catch (err)
  {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar adicional no pedido.' });
  }
};

const atualizarItemCardapio = async (req, res) => {
  const ID = req.params.id;
  const dados = req.body;

  
  try {
    if (!ID || isNaN(ID)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }
    const menuItem = await orderMenuService.buscarItemCardapioPorID(ID);
    if (!menuItem) {
      return res.status(404).json({ error: 'Item do Cardapio não encontrado.' });
    }
    const result = await orderMenuService.atualizarItemCardapio(ID, dados);
    res.status(201).json({ message: 'Item do Cardapio atualizado com sucesso.'});
  } 
  catch (err)
  {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar ItemCardapio.' });
  }
};
/*
const atualizarEstoqueAposPedido = async (req, res) => {
  const ID = req.params.id;
  console.log("Id = " + ID);

  try {
    if (!ID || isNaN(ID)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    // Inicia a transação
    db.beginTransaction(async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao iniciar a transação.' });
      }

      const result = await orderMenuService.atualizarEstoqueAposPedido(ID);

      if (!result || !result.idItemsCardapio) {
        return db.rollback(() => {
          res.status(500).json({ error: 'Erro ao obter os itens do cardápio.' });
        });
      }

      const { idItemsCardapio, adicionais } = result;

      try {
        for (const adicional of adicionais) {
          const { idItem, quantidade } = adicional;

          // Buscar lotes no estoque para o item atual
          const lotes = await orderMenuService.buscarEstoquePorItem(idItem);
          console.log("Lotes = ", lotes);
          if (!lotes || lotes.length === 0) {
            return res.status(404).json({ error: `Estoque não encontrado para o item ${idItem}.` });
            // return db.rollback(() => {
            //   return res.status(404).json({ error: `Estoque não encontrado para o item ${idItem}.` });
            // });
          }

          // Passa tanto os lotes quanto a quantidade para a função que vai atualizar o estoque
          await orderMenuService.atualizarAdicionaisAposPedido(lotes, quantidade);
        }

      } catch (err) {
        console.error(err);
        db.rollback(() => {
          res.status(500).json({ error: 'Erro ao atualizar Estoque Após Pedido.' });
        });
      }
      console.log("Bala");
      try{

        for (const itemCardapio of idItemsCardapio) {
          console.log("Itens cardapio: " + itemCardapio);
          const itensComposicao = await orderMenuService.listarComposicao({ idItemCardapio: itemCardapio });

          if (!itensComposicao || itensComposicao.length === 0) {
            console.log(`Itens para o ItemCardápio ${itemCardapio.ID_Item_Cardapio} não encontrados.`);
            continue; // Se não encontrar itens, continua com o próximo ItemCardápio
          }

          console.log("Itens Composição:", itensComposicao);

          for (const { ID_Item: idItem, Quantidade_Composicao: quantidade } of itensComposicao) {
            // Buscar lotes no estoque para o item atual
            const lotes = await orderMenuService.buscarEstoquePorItem(idItem);
            console.log("Lotes = ", lotes);

            if (!lotes || lotes.length === 0) {
              console.log("Antes erro");
               return res.status(404).json({ error: `Estoque não encontrado para o item ${idItem}.` });
            }
            console.log("Continuando");

            await orderMenuService.atualizarAdicionaisAposPedido(lotes, quantidade); //nome da função ta para adicionais, mas ta errado é pra ser generico
          }
        }
      } catch (err) {
        console.error(err);
        db.rollback(() => {
          res.status(500).json({ error: 'Erro ao atualizar Estoque Após Pedido.' });
        });
      }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Erro no commit:', err);
              res.status(500).json({ error: 'Erro ao finalizar transação.' });
            });
          }
          res.status(201).json({ message: 'Estoque POS atualizado com sucesso.' });
        });

      
    });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      return db.rollback(() => {
        res.status(400).json({ error: err.message });
      });    }
    
  }
};
*/


const atualizarEstoqueAposPedido = async (req, res) => {
  const ID = req.params.id;
  console.log("Id = " + ID);

  try {
    if (!ID || isNaN(ID)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }

    // Inicia a transação
    await beginTransaction();  // Espera pela transação começar

    const result = await orderMenuService.atualizarEstoqueAposPedido(ID);
    if (!result || !result.idItemsCardapio) {
      await rollbackTransaction();  // Se der erro, faz rollback
      return res.status(500).json({ error: 'Erro ao obter os itens do cardápio.' });
    }

    const { idItemsCardapio, adicionais } = result;

    // Processar adicionais
    for (const adicional of adicionais) {
      const { idItem, quantidade } = adicional;
      const lotes = await orderMenuService.buscarEstoquePorItem(idItem);
      console.log("Lotes = ", lotes);

      if (!lotes || lotes.length === 0) {
        await rollbackTransaction();  // Rollback em caso de erro
        return res.status(404).json({ error: `Estoque não encontrado para o item ${idItem}.` });
      }

      await orderMenuService.atualizarAdicionaisAposPedido(lotes, quantidade);
    }

    // Processar itens do cardápio
    for (const itemCardapio of idItemsCardapio) {
      console.log("Itens cardapio: " + itemCardapio);
      const itensComposicao = await orderMenuService.listarComposicao({ idItemCardapio: itemCardapio });

      if (!itensComposicao || itensComposicao.length === 0) {
        console.log(`Itens para o ItemCardápio ${itemCardapio.ID_Item_Cardapio} não encontrados.`);
        continue;
      }

      for (const { ID_Item: idItem, Quantidade_Composicao: quantidade } of itensComposicao) {
        const lotes = await orderMenuService.buscarEstoquePorItem(idItem);
        console.log("Lotes = ", lotes);

        if (!lotes || lotes.length === 0) {
          console.log("Antes erro");
          await rollbackTransaction();  // Rollback em caso de erro
          return res.status(404).json({ error: `Estoque não encontrado para o item ${idItem}.` });
        }

        await orderMenuService.atualizarAdicionaisAposPedido(lotes, quantidade);
      }
    }

    // Commit da transação se tudo ocorrer bem
    await commitTransaction();  // Faz commit na transação
    res.status(201).json({ message: 'Estoque POS atualizado com sucesso.' });

  } catch (err) {
    console.error(err);
    await rollbackTransaction();  // Rollback em caso de erro geral
    res.status(500).json({ error: 'Erro ao atualizar Estoque Após Pedido.' });
  }
};

const deletarSecaoCardapio = async (req, res) => {
    try {
      const sectionMenuId = req.params.id;
  
      if (!sectionMenuId || isNaN(sectionMenuId)) {
        return res.status(400).json({ error: 'ID inválido fornecido.' });
      }
  
      const sectionMenu = await orderMenuService.buscarSecaoCardapioPorID(sectionMenuId);
  
      if (!sectionMenu) {
        return res.status(404).json({ error: 'Secao Cardapio não encontrada.' });
      }

      const itens = await orderMenuService.listarItensCardapio({idSecaoCardapio: sectionMenuId})
      
      if (itens.length > 0) {
        return res.status(400).json({
            error: 'Não é possível deletar o item do cardapio, pois ele está conectado a Itens do Cardapio',
        });
      }

      await orderMenuService.deletarSecaoCardapio(sectionMenuId);
  
      res.status(200).json({ message: 'Secao do Cardapio deletado com sucesso.' });
    } catch (err) {
      console.error('Erro ao deletar Secao do Cardapio:', err.message);
      res.status(500).json({ error: 'Erro interno ao deletar SecaoCardapio.' });
    }
  };


  const deletarAdicionalCardapio = async (req, res) => {
    try {
      const additionalMenuId = req.params.id;
  
      if (!additionalMenuId || isNaN(additionalMenuId)) {
        return res.status(400).json({ error: 'ID inválido fornecido.' });
      }
  
      const additionalMenu = await orderMenuService.buscarAdicionalCardapioPorID(additionalMenuId);
  
      if (!additionalMenu) {
        return res.status(404).json({ error: 'Item Cardapio não encontrado.' });
      }

      const adicionados = await orderMenuService.listarAdicionados({idAdicional: additionalMenuId})
      
      if (adicionados.length > 0) {
        return res.status(400).json({
            error: 'Não é possível deletar o adicional do cardapio, pois ele está conectado a Itens de Pedidos',
        });
      }
  
      await orderMenuService.deletarAdicionalCardapio(additionalMenuId);
  
      res.status(200).json({ message: 'Adicional deletado com sucesso.' });
    } catch (err) {
      console.error('Erro ao deletar Adicional:', err.message);
      res.status(500).json({ error: 'Erro interno ao deletar AdicionalCardapio.' });
    }
  };

  const deletarAdicionar = async (req, res) => {
    try {
      const item_pedido_id = req.params.id;
  
      if (!item_pedido_id || isNaN(item_pedido_id)) {
        return res.status(400).json({ error: 'ID inválido fornecido.' });
      }
  
      const adicionar = await orderMenuService.buscarAdicionarPorID(item_pedido_id);
  
      if (!adicionar) {
        return res.status(404).json({ error: 'Item Cardapio não encontrado.' });
      }
  
      await orderMenuService.deletarAdicionar(item_pedido_id);
  
      res.status(200).json({ message: 'Adicional do pedido deletado com sucesso.' });
    } catch (err) {
      console.error('Erro ao deletar Adicional do pedido:', err.message);
      res.status(500).json({ error: 'Erro interno ao deletar Adicionar.' });
    }
  };


module.exports = {listarComposicao, listarAdicionados, listarItensCardapio, buscarItemCardapioPorID, adicionarAdicionar, buscarAdicionarPorID, adicionarItemCardapio, deletarItemCardapio, listarSecoesCardapio, buscarSecaoCardapioPorID, adicionarSecaoCardapio, deletarSecaoCardapio,listarAdicionaisCardapio, buscarAdicionalCardapioPorID, adicionarAdicionalCardapio, atualizarEstoqueAposPedido, atualizarAdicionar,  atualizarItemCardapio, deletarAdicionalCardapio, deletarAdicionar};