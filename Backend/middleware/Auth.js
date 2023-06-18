var jwt = require('jsonwebtoken');


const tokenVerify=async(req,res,next)=>{
    try {

        token = req.cookies["token"]
        // console.log(token)
    //    let token=req.headers["token"]
    // console.log(token)
    if(!token) return res.status(401).send({status : false , message: "No token provided'"})
        jwt.verify(token,"shhhhh",(err,decoded)=>{
            if(err){return res.status(401).send({status:false,message:"Failed to authenticate token"})}
             req.head=decoded.userid
             next()
        })
    } catch (error) {
        res.status(500).send({status:false, message :error.message})
    }
}
module.exports={tokenVerify}