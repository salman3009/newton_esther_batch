const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        set:(value)=>value.toLowerCase()
    },
    age:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean
    },
    hobbies:{
        type:[String],
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('employee',employeeSchema);