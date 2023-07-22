const express = require("express");

// Importing the controller functions.
const {getProductByID, createProduct, updateProduct, deleteProduct, searchProducts
} = require("../controllers/productControllers");

// Import the required middlewares here.
const { grantAccessTo } = require('../middlewares/grantAccessTo');

const router = express.Router();

// Public Routes
router.get("/", /*grantAccessTo(['guest', 'user', 'admin', 'superadmin']),*/ searchProducts);
router.get("/:id", /*grantAccessTo(['guest', 'user', 'admin', 'superadmin']),*/ getProductByID);

//Admin Only Routes
router.post("/", grantAccessTo(['admin', 'superadmin']), createProduct);
router.patch("/:id", grantAccessTo(['admin', 'superadmin']),  updateProduct);
router.delete("/:id", grantAccessTo(['admin', 'superadmin']),  deleteProduct);

module.exports = router;