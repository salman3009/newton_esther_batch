const {Schema,model} = require('mongoose');

const TransactionSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

module.exports = model('transaction',TransactionSchema);