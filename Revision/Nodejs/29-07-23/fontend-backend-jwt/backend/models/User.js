const {Schema,model} = require('mongoose');

const UserSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    access:{
        type:String,
        enum:['employee','admin'],
        default:'employee'
    }
})

module.exports = model('user',UserSchema)