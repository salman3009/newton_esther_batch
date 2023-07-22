const express = require("express");

// Importing the controller functions.
const { placeOrder, showAllOrders } = require('../controllers/orderControllers');

const router = express.Router();

router.get('/', showAllOrders)
router.post('/', placeOrder);

module.exports = router