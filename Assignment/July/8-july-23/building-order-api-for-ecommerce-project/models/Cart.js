/* Cart Model */
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            validate(value) {
                if (value < 1) {
                    throw new Error('Quantity must be a positive number');
                }
            }
        }
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;