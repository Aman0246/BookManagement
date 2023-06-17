const { isValidObjectId } = require("mongoose")
const{BookModel}=require("../Models/BookModel")
const {UserModel}=require("../Models/UserModel")
var isbnIsValid = require('isbn-validator');
const {isValid}=require("../Utils")




//     reviews: { type: Number, default: 0, trim: true },
//     deletedAt: { type: Date, trim: true },
//     isDeleted: { type: Boolean, default: false, trim: true },


const createBook=async(req,res)=>{
try {
    const {title,excerpt,userId,ISBN,category,subcategory}=req.body
    if(!excerpt||!userId||!ISBN||!category||!subcategory)return res.status(400).send({status:false,message:"one of this field  excerpt,userId,ISBN,category,subcategory is empty"})

    title=title.trim()
    if(!isValid(title))return res.status(400).send({status:false,message:"title should be string"})
    let data=await BookModel.findOne({title})
    if(data) return res.status(400).send({status:false,message:"book with same title present"})



    excerpt=excerpt.trim() 
    if(!isValid(excerpt))return res.status(400).send({status:false,message:"excerpt should be string"})



     userId=userId.trim()
    if(!isValidObjectId(userId))return res.status(400).send({status:false,message:"userid is not valid"})
    let user=await UserModel.findById({userId})
    if(!user)return res.status(400).send({status:false,message:"user doesnot exist"})


    ISBN =ISBN.trim()
    if(!isbnIsValid(ISBN))return res.status(400).send({status:false,message:"ISBN is not valid"})
    let deta=await BookModel.findOne({ISBN})
    if(deta) return res.status(400).send({status:false,message:"book with same ISBN present"})


    category=category.trim()
    if(!isValid(category))return res.status(400).send({status:false,message:"category should be string"})
    
    
    
    subcategory=subcategory.trim()
    if(!isValid(subcategory))return res.status(400).send({status:false,message:"subcategory should be string"})


    const today = new Date().toISOString().slice(0, 10)


    let createdBook=await BookModel.create({title,excerpt,userId,ISBN,category,subcategory,releasedAt:today})
    
    res.status(201).send({status:true,data:createdBook})
    
} catch (error) {
    res.status(500).send({status:false,message:error})
}

}