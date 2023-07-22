const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
      studentName:{type:String,required:true},
      studentId:{type:String,required:true},
      batch:{type:String},
      permanentAddress:[{
          doorNumber:{type:String},
          city:{type:String},
          pinCode:{type:Number}
      }]
      //embedded sub document
})

module.exports = mongoose.model('student',studentSchema);