const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
      firstName:{
        type:String,
        required:[true,'firstName should not be empty']
      },
      age:{
        type:Number
      },
      hobbies:{
        type:[String]
      },
      salary:{
        type:Number
      }
})

module.exports = mongoose.model('employee',employeeSchema);