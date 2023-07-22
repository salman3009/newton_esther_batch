const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
       firstName:{
          type:String,
          unique:true,
          required:[true,'firstName should be required'],
          minlength:[4,'min length is 4'],
          maxlength:[10,'max length is 10']
       },
       age:{
        type:Number,
        required:[true,'age must be required'],
        min:[18,'age must be 18 or above'],
        max:[60,'age must be 60 below']
       },
       hobbies:{
         type:[String],
         enum:['music','cricket'],
         validate:{
              validator:function(input){
                 return input.length>0;
              },
              message:'you must give atleast one hobbies'
         }
       }
});

module.exports = mongoose.model('employee',employeeSchema);