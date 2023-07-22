var mongoose = require("mongoose");

//Write your Schema with Async Validators .
//When a new user try to register you need to makesure there is no User exist with current email adress.

var userSchema = mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    validate:{
        async validator(input){
         const result = await checkEmailExists(User,input);
         return !result;
        },
        message: 'Email already exists'
    }
   }
});

const User = mongoose.model("User",userSchema);

async function checkEmailExists(User,email){
    const count = await User.countDocuments({email});
    return count!=0;
}

module.exports = User;
