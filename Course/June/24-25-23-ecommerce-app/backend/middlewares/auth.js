

const verifyAuthToken = async (req,res,next)=>{
    try{
        const token = req.header("token");
        const email = req.header("email");
        console.log("inside the middleware",token,email);
        if(token != "xyz123"){
            return res.status(400).json({message:"Token is invalid login again"});
        }
        if(!email){
            return res.status(400).json({message:"email is not found"});
        }
         req.body = {...req.body,email};
         console.log("inside the middleware",req.body);
         next();
    }catch(err){
        return res.status(400).json({message:"Internal server error"})
    }
   

}

module.exports.verifyAuthToken = verifyAuthToken;