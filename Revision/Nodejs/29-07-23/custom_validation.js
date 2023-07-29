const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
      firstName:{
        type:String,
        required:[true,'firstName should not be empty'],
        minlength:[4,'minimum should be 4'],
        maxlength:[10,'maximum length is allowed 10'],
        // validate:{
        //   validator:function(input){
        //               let pattern = /^[a-zA-Z0-9]+$/;
        //               return pattern.test(input);
        //   },
        //   message:'No pattern validation is matched'
        // }
        validate(input){
          let pattern = /^[a-zA-Z0-9]+$/;
           let result = pattern.test(input);
           if(!result){
               throw new Error('pattern not matched');
           }
        }
      },
      age:{
        type:Number,
        required:[true,'age cannot be empty'],
        min:[18,'age must be 18 or above'],
        max:[60,'age must be below 60']
      },
      hobbies:{
        type:[String],
        enum:['music','cricket','snooker','racing'],
        validate:{
          validator:function(input){
             return input.length>1
          },
          message:'please select altest 2 data'
        }
      },
      salary:{
        type:Number,
        required:[true,'salary should not be empty']
      }
})

module.exports = mongoose.model('employee',employeeSchema);