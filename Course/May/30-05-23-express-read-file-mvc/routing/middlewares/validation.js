

module.exports = (req,res,next)=>{
    if(req.body.source && req.body.destination && req.body.payment){
        next();
    }
    else{
        res.status(400).json({
            status:"failed",
            message:"validation error,source,destionation,payment should be present"
        })
    }
}