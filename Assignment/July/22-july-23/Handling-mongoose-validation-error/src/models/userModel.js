// User Model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:[true,'Name is required']
   },
   email:{
    type:String,
    unique:true,
    validate:{
      validator:function(value){
         return /^\S+@\S+\.\S+$/.test(value);
      },
      message:'Invalid email format'
    },
   },
  //Write a schema for name and email here
  // name:type string and required true
  //email: type String and required true, also write a custom validator
  // function using this regex /^\S+@\S+\.\S+$/
});

module.exports = mongoose.model('Validation', userSchema);
