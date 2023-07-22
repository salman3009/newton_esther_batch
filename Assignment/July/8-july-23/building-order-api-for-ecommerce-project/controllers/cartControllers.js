const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');


const getCart = async (req, res) => { 
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            message: "User ID is required",
            status: "Error"
        });
    }

    try {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(200).json({
                message: "Cart is empty",
                status: "Success",
                cart: {
                    user: userId,
                    products: []
                }
            });
        }

        return res.status(200).json({
            message: "Cart fetched successfully",
            status: "Success",
            cart
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            status: "Error",
            error: err
        });
    }
}

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId) {
        return res.status(400).json({
            message: "User ID is required",
            status: "Error"
        });
    }

    if (!productId) {
        return res.status(400).json({
            message: "Product ID is required",
            status: "Error"
        });
    }

    if (!quantity || quantity < 1) {
        return res.status(400).json({
            message: "Quantity must be a positive number",
            status: "Error"
        });
    }

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                products: []
            });
        }

        const cartProductIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (cartProductIndex >= 0) {
            cart.products[cartProductIndex].quantity += quantity;
        } else {
            cart.products.push({
                product: productId,
                quantity: quantity
            });
        }

        await cart.save();

        return res.status(200).json({
            message: "Product added to cart",
            status: "Success",
            cart
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            status: "Error",
            error: err
        });
    }
};


const deleteFromCart = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                status: "Error"
            });
        }

        const cartProductIndex = cart.products.findIndex(p =>
            p.product.toString() === productId
        );

        if (cartProductIndex >= 0) {
            cart.products.splice(cartProductIndex, 1);
            await cart.save();

            if (cart.products.length === 0) {
                await cart.deleteOne();
            }
        }

        return res.status(200).json({
            message: "Product deleted from cart",
            status: "Success",
            cart
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            status: "Error",
            error: err
        });
    }
};

module.exports = { getCart ,addToCart, deleteFromCart };