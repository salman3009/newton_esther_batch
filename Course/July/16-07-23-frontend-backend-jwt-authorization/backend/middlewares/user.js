const jwt = require('jsonwebtoken');

const verifyAuthToken = async(req,res,next)=>{
     try{
        const token = req.header('auth-token');
        const verified = jwt.verify(token,'secret-newton-school-token');
        req.user = verified;
        console.log("verifyAuthToken",req.user);
        next();
     }catch(err){
         return res.status(400).json({
            message:'authentication failed'
         })
     }
}

module.exports.verifyAuthToken = verifyAuthToken;