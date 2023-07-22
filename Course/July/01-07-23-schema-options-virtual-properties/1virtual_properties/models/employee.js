const mongoose = require('mongoose');


const employeeSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true}
})

employeeSchema.virtual('fullName').get(function(){
    return this.firstName + " " + this.lastName;
})

module.exports = mongoose.model('employee',employeeSchema);