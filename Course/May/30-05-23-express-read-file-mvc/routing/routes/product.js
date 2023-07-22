const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const validationMiddleware = require('../middlewares/validation');
const getProductMiddlware = require('../middlewares/getProduct');

router.get('',productController.getListController);
router.post('',validationMiddleware,getProductMiddlware,productController.postListController);

module.exports = router;