const { number } = require("joi");
var mongoose= require("mongoose");

var productSchema= mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    category: {
        type: String,
        required: true
      }
    
});

module.exports =mongoose.model("products",productSchema);