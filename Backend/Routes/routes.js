const express=require("express")
const routes=express.Router()
const{registration,login} =require("../Controller/UserController")
const{tokenVerify}=require("../middleware/Auth")

routes.post("/register",registration)
routes.post("/login",login)




module.exports={routes}