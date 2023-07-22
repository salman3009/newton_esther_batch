const express = require('express');
const router = express.Router();
const {verifyAuthToken} = require('../middlewares/user');
const {verifyUserAccess} = require('../middlewares/accessauth');
const {createTransaction,listTransaction,deleteTransaction} = require('../controllers/transaction');


router.post('/create',verifyAuthToken,createTransaction);
router.get('/list',verifyAuthToken,listTransaction);
router.delete('/delete/:id',verifyAuthToken,verifyUserAccess,deleteTransaction);



module.exports = router;