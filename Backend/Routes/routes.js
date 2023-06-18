const express=require("express")
const routes=express.Router()
const{registration,login} =require("../Controller/UserController")
const{tokenVerify}=require("../middleware/Auth")
const {createBook,getbook,getBookDetails,updateBook,deleteBook}=require("../Controller/BookController")
const {addReviewToBook,updateReview,deleteReview }=require("../Controller/ReviewController")




routes.post("/register",registration)
routes.post("/login",login)
routes.post("/books",tokenVerify,  createBook)
routes.get("/books",tokenVerify,   getbook)
routes.get("/books/:bookId",tokenVerify,   getBookDetails)
routes.put("/books/:bookId",tokenVerify,   updateBook)
routes.delete("/books/:bookId",tokenVerify,   deleteBook)
routes.post("/books/:bookId/review",tokenVerify,   addReviewToBook)
routes.put("/books/:bookId/review/:reviewId",tokenVerify,   updateReview)
routes.delete("/books/:bookId/review/:reviewId",tokenVerify,   deleteReview)




module.exports={routes}