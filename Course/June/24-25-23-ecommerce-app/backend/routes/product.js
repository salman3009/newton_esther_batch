const express = require('express');
const router = express.Router();


const {
    createProduct,getListProduct,
} = require('../controller/product');

const {verifyAuthToken} = require('../middlewares/auth');


router.post('/create',verifyAuthToken,createProduct);
router.get('/list',verifyAuthToken,getListProduct);

module.exports = router;