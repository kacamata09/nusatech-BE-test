const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.post('/topup', authMiddleware, transactionController.topUp);
router.post('/transaction', authMiddleware, transactionController.createTransaction);
router.get('/balance', authMiddleware, transactionController.getBalance);
router.get('/transaction/history', authMiddleware, transactionController.getTransactionHistory);

module.exports = router;
