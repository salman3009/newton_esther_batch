const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    fullName:{type:String,required:true},
    age:{type:Number,required:true},
    status:{type:Boolean},
    hobbies:{type:[String],required:true},
    salary:{type:Number,required:true}
});


module.exports = mongoose.model('customer',customerSchema);