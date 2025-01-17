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

module.exports = { adicionarPedido, listarPedidos, listarPedidoPorId, atualizarPedido, deletarPedido };