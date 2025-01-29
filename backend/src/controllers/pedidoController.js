const pedidoService = require('../services/pedidoService');

const adicionarPedido = async (req, res) => {
  const { idAtendente, senha, valor, dataPedido, informacoes, idPagamento, dataEmissaoPagamento, valorTotal } = req.body;

  try {
    const result = await pedidoService.adicionarPedido(idAtendente, senha, valor, dataPedido, informacoes, idPagamento, dataEmissaoPagamento, valorTotal);
    res.status(201).json({ message: 'Pedido adicionado com sucesso.', pedidoId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar pedido.' });
  }
}

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoService.listarPedidos();
    res.json(pedidos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pedidos.' });
  }
}

const listarPedidoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await pedidoService.listarPedidoPorId(id);
    res.json(pedido);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar pedido.' });
  }
}

const atualizarPedido = async (req, res) => {
  const { id } = req.params;
  const camposParaAtualizar = req.body;

  try {
    await pedidoService.atualizarPedido(id, camposParaAtualizar);
    res.json({ message: 'Pedido atualizado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar pedido.' });
  }
}

const deletarPedido = async (req, res) => {
  const { id } = req.params;

  try {
    await pedidoService.deletarPedido(id);
    res.json({ message: 'Pedido deletado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar pedido.' });
  }
}


const buscarItemPedidoPorID = async (req, res) => {
  const ID = req.params.id;
  try {
    const itemPedido = await pedidoService.buscarItemPedidoPorID(ID);
    res.json(itemPedido);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar ItemPedido.' });
  }
};

const atualizarItemPedido = async (req, res) => {
  const ID = req.params.id;
  const dados = req.body;

  
  try {
    if (!ID || isNaN(ID)) {
      return res.status(400).json({ error: 'ID inválido fornecido.' });
    }
    const itemPedido = await pedidoService.buscarItemPedidoPorID(ID);
    if (!itemPedido) {
      return res.status(404).json({ error: 'Item Pedido não encontrado.' });
    }
    const result = await pedidoService.atualizarItemPedido(ID, dados);
    res.status(201).json({ message: 'Item Pedido atualizado com sucesso.'});
  } 
  catch (err)
  {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar ItemPedido.' });
  }
};

const deletarItemPedido= async (req, res) => {
    try {
      const item_pedido_id = req.params.id;
  
      if (!item_pedido_id || isNaN(item_pedido_id)) {
        return res.status(400).json({ error: 'ID inválido fornecido.' });
      }
  
      const item_pedido = await pedidoService.buscarItemPedidoPorID(item_pedido_id);
  
      if (!item_pedido) {
        return res.status(404).json({ error: 'Item Cardapio não encontrado.' });
      }
  
      await pedidoService.deletarItemPedido(item_pedido_id);
  
      res.status(200).json({ message: 'Item pedido deletado com sucesso.' });
    } catch (err) {
      console.error('Erro ao deletar Item Pedido:', err.message);
      res.status(500).json({ error: 'Erro interno ao deletar ItemPedido.' });
    }
  };

  const adicionarItemPedido = async (req, res) => {
    const dados = req.body;
  
    try {
      const result = await pedidoService.adicionarItemPedido(dados);
      res.status(201).json({ message: 'Item pedido adicionado ao pedido com sucesso.', itemPedidoID: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao adicionar ItemPedido no pedido.'});
    }
  };
  

module.exports = { adicionarPedido, listarPedidos, listarPedidoPorId, atualizarPedido, deletarPedido, buscarItemPedidoPorID, atualizarItemPedido, deletarItemPedido, adicionarItemPedido};