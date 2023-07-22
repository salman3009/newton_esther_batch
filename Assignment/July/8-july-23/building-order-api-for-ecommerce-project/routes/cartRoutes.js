const express = require("express");

// Importing the controller functions.
const { addToCart, deleteFromCart, getCart } = require('../controllers/cartControllers');

const router = express.Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/delete', deleteFromCart)

module.exports = router