const mongoose = require('mongoose');


const addressSchema = mongoose.Schema({
        doorNumber:{type:String},
        city:{type:String},
        pinCode:{type:Number}
});

module.exports = mongoose.model('address',addressSchema);