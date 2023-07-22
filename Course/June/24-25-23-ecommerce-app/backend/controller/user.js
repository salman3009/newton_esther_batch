const User = require('../models/user');

const createUser= async(req,res)=>{
   try{
    console.log(req.body);
    const post= new User({
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password
    })
    let result = await post.save();
    res.status(201).json({
        message:"successful",
        post:result
    })
   }catch(err){
    res.status(500).json({
        message:err.message?err.message:'internal server error'
    })
   }
}

const loginUser = async (req,res)=>{
    try{
        let emailResult = await User.findOne({email:req.body.email});
        if(!emailResult){
            res.status(400).json({message:"Email is not found"});
            return;
        }
        console.log(emailResult.password);
        if(emailResult.password != req.body.password){
            res.status(400).json({message:"password not match"});
            return;
        }
         res.status(200).json({
            message:"successful",
            token:'xyz123',
            email:emailResult.email
         })
    }catch(err){
        res.status(500).json({
            message:err.message?err.message:'internal server error'
        }) 
    }
}
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;