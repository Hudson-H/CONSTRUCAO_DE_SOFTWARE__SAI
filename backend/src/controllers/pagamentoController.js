const pedidoService = require('../services/pedidoService');

const adicionarPagamento = async (req, res) => {
  const { id } = req.params;
  const camposParaAtualizar = req.body;

  try {
    await pedidoService.atualizarPedido(id, camposParaAtualizar);
    res.json({ message: 'Pagamento adicionado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar pagamento.' });
  }
}

module.exports = { adicionarPagamento };