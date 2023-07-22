const mongoose = require('mongoose');


const addressSchema = mongoose.Schema({
        doorNumber:{type:String},
        city:{type:String},
        pinCode:{type:Number},
        postedBy:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'student'
        }
});

module.exports = mongoose.model('address',addressSchema);