const jwt=require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
     const token=req.headers.token;
     if(!token){
        return res.json({message:"No token found",status:false})
     }
     jwt.verify(token,process.env.Jwt_Secret_Key,(err,decode)=>{
        if(err){
            return res.json({message:"Invalid token",status:false})
        }else{
            // req.user=decode; //id & role
            next()
        }

     })
}

module.exports=verifyToken;