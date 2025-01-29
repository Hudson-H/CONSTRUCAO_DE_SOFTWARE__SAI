const pedidoService = require('../services/pedidoService');
const db = require('../config/db')

const adicionarPedido = async (req, res) => {
  const { idAtendente, Senha, Data_Pedido, Informacoes, ID_Pagamento, Data_Emissao_Pagamento } = req.body;

  db.beginTransaction();
  try {
    const result = await pedidoService.adicionarPedido(idAtendente, Senha, Data_Pedido, Informacoes, ID_Pagamento, Data_Emissao_Pagamento);
    const valor_total = await pedidoService.calcularValorPedido(result.insertId);
    const atualiza_pedido = await pedidoService.atualizarPedido(result.insertId, valor_total[0]);
    db.commit();
    res.status(201).json({ message: 'Pedido adicionado com sucesso.', pedidoId: result.insertId });
  } catch (err) {
    db.rollback();
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

  if(Object.keys(camposParaAtualizar).length == 1 && Object.keys(camposParaAtualizar)[0] == "Estado") {
    try {
      await pedidoService.atualizarPedido(id, camposParaAtualizar);
      res.json({ message: 'Estado do pedido atualizado com sucesso.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar o estado pedido.' });
    }
  } else {
    try {
      await pedidoService.atualizarPedido(id, camposParaAtualizar);
      res.json({ message: 'Pedido atualizado com sucesso.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar pedido.' });
    }
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