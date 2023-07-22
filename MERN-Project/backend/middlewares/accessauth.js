

const verifyUserAccess = async(req,res,next)=>{
     try{
        if(req.user.access == 'admin'){
            next();
        }
        else{
            return res.status(400).json({
                message:'authorization failed'
             }) 
        }
     }catch(err){
         return res.status(400).json({
            message:'authorization failed'
         })
     }
}

module.exports.verifyUserAccess = verifyUserAccess;