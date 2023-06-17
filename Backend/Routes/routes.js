const express=require("express")
const routes=express.Router()
const{registration,login} =require("../Controller/UserController")
const{tokenVerify}=require("../middleware/Auth")
const {createBook,getbook,getBookDetails,updateBook,deleteBook}=require("../Controller/BookController")

routes.post("/register",registration)
routes.post("/login",login)
routes.post("/books",createBook)
routes.get("/books",getbook)
routes.get("/books/:bookId",getBookDetails)
routes.put("/books/:bookId",updateBook)
routes.delete("/books/:bookId",deleteBook)
routes.post("/books/:bookId/review",addReviewToBook)




module.exports={routes}