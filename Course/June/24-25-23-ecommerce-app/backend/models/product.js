const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    productName:{type:String,unique:true,required:true},
    email:{type:String,required:true},
    price:{type:Number,required:true},
    discount:{type:Boolean,required:true,default:false},
    discountPrice:{type:Number,required:true,default:0},
    stock:{type:Number,required:true,default:0},
})

module.exports = mongoose.model('product',productSchema);