/* User Model */
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (value.length < 4) {
                    throw new Error('username must be at least 4 characters long');
                }
                if (/\s/.test(value)) {
                    throw new Error('username cannot contain spaces');
                }
                if (/[^a-zA-Z0-9]/.test(value)) {
                    throw new Error('username cannot contain special characters');
                }
            },
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (value.length < 8) {
                    throw new Error('password should be atleast 8 characters long');
                }
            },
        }, 
        productsPurchased: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

