const express = require('express');
const { getStatusController } = require('../controllers/statusController');
const router = express.Router();

router.get('/status', getStatusController);

module.exports = router;