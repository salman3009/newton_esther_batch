const express = require('express');
const router = express.Router();
const {verifyAuthToken} = require('../middlewares/user');

const {createTransaction,listTransaction} = require('../controllers/transaction');


router.post('/create',verifyAuthToken,createTransaction);
router.get('/list',verifyAuthToken,listTransaction)


module.exports = router;