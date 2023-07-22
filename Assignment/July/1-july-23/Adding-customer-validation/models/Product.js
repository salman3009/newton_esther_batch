

/* Product Model */
const mongoose = require('mongoose');

/*
Add Custom Validation to Product Model
Validate that the product name is at least 3 characters long, the description is at least 10 characters long, and the price is a positive number.
Throw an error is the Validation fails.
*/
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(input){
            if(input.length < 3){
                throw new Error('Product name must be at least 3 characters long');
            }
        }
    },
    description: {
        type: String,
        required: true,
        validate(input){
            if(input.length < 10){
                throw new Error ('Description must be least 10 characters long');
            }
        }
    },
    price: {
        type: Number,
        required: true,
         validate(input){
            if(value < 0){
                throw new Error('Price must be a positive number');
            }
         }
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;