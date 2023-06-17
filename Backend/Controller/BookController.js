const { isValidObjectId } = require("mongoose")
const{BookModel}=require("../Models/BookModel")
const {UserModel}=require("../Models/UserModel")
const isbnValidate = require('isbn-validate');
const {isValid}=require("../Utils")
const {ReviewModel}=require("../Models/ReviewModel")



const createBook=async(req,res)=>{
try {
    const {title,excerpt,userId,ISBN,category,subcategory}=req.body
    if(!excerpt||!userId||!ISBN||!category||!subcategory)return res.status(400).send({status:false,message:"one of this field  excerpt,userId,ISBN,category,subcategory is empty"})

    title=title.trim()
    if(!isValid(title))return res.status(400).send({status:false,message:"title should be string"})
    let data=await BookModel.findOne({title})
    if(data) return res.status(400).send({status:false,message:"book with same title present"})



    excerpt=excerpt.trim() 
    if(!validString(excerpt))return res.status(400).send({status:false,message:"excerpt string containing number"})
    if(!isValid(excerpt))return res.status(400).send({status:false,message:"excerpt should be string"})



     userId=userId.trim()
     if(!isValid(userId))return res.status(400).send({status:false,message:"userId should be string"})
    if(!isValidObjectId(userId))return res.status(400).send({status:false,message:"userid is not valid"})
    let user=await UserModel.findById({userId})
    if(!user)return res.status(400).send({status:false,message:"user doesnot exist"})


    ISBN =ISBN.trim()
    if(!isValid(ISBN))return res.status(400).send({status:false,message:"ISBN should be string"})
    if(!isbnValidate(ISBN))return res.status(400).send({status:false,message:"ISBN is not valid"})
    let deta=await BookModel.findOne({ISBN})
    if(deta) return res.status(400).send({status:false,message:"book with same ISBN present"})


    category=category.trim()
    if(!isValid(category))return res.status(400).send({status:false,message:"category should be string"})
    if(!validString(category))return res.status(400).send({status:false,message:"category string containing number"})
        
    
    
    subcategory=subcategory.trim()
    if(!isValid(subcategory))return res.status(400).send({status:false,message:"subcategory should be string"})
    if(!validString(subcategory))return res.status(400).send({status:false,message:"subcategory string containing number"})


    const today = new Date().toISOString().slice(0, 10)
    let createdBook=await BookModel.create({title,excerpt,userId,ISBN,category,subcategory,releasedAt:today})
    
    res.status(201).send({status:true,data:createdBook})
    
} catch (error) {
    res.status(500).send({status:false,message:error})
}

}
//==================================================================================================================
//==================================================================================================================
//==================================================================================================================




const getbook=async(req,res)=>{
    try {
   
        const { userId, category, subcategory } = req.query;

        const filters = {};
    
        if (userId) filters.userId = userId;
        if (category) filters.category = category;
        if (subcategory) filters.subcategory = subcategory;

        const books = await BookModel.find({ deleted: false, ...filters })
        .select({_id:1, title:1, excerpt:1, userId:1, category:1 ,releasedAt:1, reviews:1,__v:0,createdAt:0,updatedAt:0})
        .sort({ title: "asc" });


        if (books.length === 0) {
            return res.status(404).send({
              status:false,
              message: 'No books found.',
            });
          }

        res.status(200).send({status:false , message:"Books list",data:books})  
        
    } catch (error) {
        res.status(500).send({status:false,message:error})
    }
}

//==================================================================================================================
//==================================================================================================================
//==================================================================================================================


const getBookDetails = async (req, res) =>{
    try {
        const { bookId } = req.params;
        const book = await BookModel.findById(bookId);
        if (!book) {
            return res.status(404).send({status:false , message: 'Book not found' });
          }
        



        if(book.reviews===0)return res.status(200).send({ status:true,  message: 'Books list',
            data: {
              book
            },
            reviewsData: []
        });




        const bookreview=await ReviewModel.findOne({bookId:book._id})
        return res.status(200).send({status:true,
        message: "Review added successfully",
        bookData: {
             book
        },
        reviewsData:bookreview
      });
         


    } catch (error) {
        return res.status(500).send({status:false,message:error});
    }
}

//==================================================================================================================
//==================================================================================================================
//==================================================================================================================


const updateBook = async (req, res) => {
    const { bookId } = req.params;
    if(!isValidObjectId(bookId))return res.status(400).send({status:false,message:"invalid objectid in paramas"})
    const { title, excerpt, releaseDate, ISBN } = req.body;
  
    try {
      const book = await BookModel.findOne({ _id: bookId, isDeleted: false });
  
      if (!book) {

        return res.status(404).send({status:false,message: 'Book not found' });
      }
  
      // Update the book with the new values
      book.title = title;
      book.excerpt = excerpt;
      book.releaseDate = releaseDate;
      book.ISBN = ISBN;
  
      // Save the updated book
      const updatedBook = await book.save();
  
      // Return the updated book
      return res.status(200).send({status:true,message:"updated true", data: updatedBook });
    } catch (error) {

      return res.status(500).send({status:false, message:error});
    }
  };

  
//==================================================================================================================
//==================================================================================================================
//==================================================================================================================


const deleteBook=async(req,res)=>{
    try {
        const {bookid}=req.params;
        if(!isValidObjectId(bookid))return res.status(400).send({status:false,message:"invalid objectid in paramas"})
        let data=await BookModel.findById({bookid})
        if(!data)return res.status(400).send({status:false,message:"Book doesnot exist of this id"})
        if(data.isDeleted===true)return res.status(400).send({status:false,message:"book already deleted"})
        data.isDeleted=true;
        await book.save();
        res.status(200).send({status:true,message:"Deleted Succesfully"})
        
    } catch (error) {
        return res.status(500).send({status:false, message:error});
        
    }

}

//==================================================================================================================
//==================================================================================================================
//==================================================================================================================







module.exports={createBook,getbook,getBookDetails,updateBook,deleteBook}