const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true}
})

employeeSchema.pre('save',async function(){
      console.log("before saving to database");
      const user = this;
      const regex = /^[a-zA-Z0-9]+$/;
      const result = regex.test(user.firstName);
      if(result){
          return Promise.resolve();
      }
      else{
          throw new Error('username is not alphanumeric');
      }
})

employeeSchema.post('save',async function(doc){
    console.log("after saving the data post method",doc);
    console.log("triggering the mail");
})



module.exports = mongoose.model('employee',employeeSchema);