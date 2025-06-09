// const jwt = require('jsonwebtoken')

// const verifyToken=(req,res,next)=>{
//      const token=req.headers.token;
//      if(!token){
//         return res.json({message:"No token found",status:false})
//      }
//      jwt.verify(token,process.env.Jwt_Secret_Key,(err,decode)=>{
//         if(err){
//             return res.json({message:"Invalid token",status:false})
//         }else{
//             req.userid=decode; //id & role
//             next();
//         }

//      })
// }

// module.exports=verifyToken;

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    // console.log('token :',token)
    if (!token) {
        return res.json({ msg: "No token found", status: false })
    }
    try {
        const decoded = jwt.verify(token, process.env.jwtSecretkey);
        req.user = decoded;  // contains id, role
        next();
    } catch (err) {
        return res.json({ msg: "Invalid or expired token", status: false });
        
    }
};

module.exports = verifyToken;