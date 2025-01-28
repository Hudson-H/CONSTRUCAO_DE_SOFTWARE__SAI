const { getStatus } = require('../services/statusService');

const getStatusController = async (req, res) => {
  try {
    const { pedidosEmAndamento, pedidosConcluidos, sessionStatus } = await getStatus(req.session);

    res.status(200).json({
      status: 'success',
      pedidosEmAndamento,
      pedidosConcluidos,
      sessionStatus,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error });
  }
};

module.exports = { getStatusController };
