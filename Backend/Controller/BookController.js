let { isValidObjectId } = require("mongoose")
let{BookModel}=require("../Models/BookModel")
let {UserModel}=require("../Models/UserModel")
let {isValid,validString,ValidISBN,isValidDate}=require("../Utils")

let {ReviewModel}=require("../Models/ReviewModel")



let createBook=async(req,res)=>{
try {
    let {title,excerpt,userId,ISBN,category,subcategory,releasedAt}=req.body

    if(!title||!excerpt||!userId||!ISBN||!category||!subcategory||!releasedAt)return res.status(400).send({status:false,message:"one of this field  excerpt,userId,ISBN,category,subcategory is empty"})
    
    // title=title.trim()
    // if(!isValid(title))return res.status(400).send({status:false,message:"title should be string"})
    let data=await BookModel.findOne({title})
    if(data) return res.status(400).send({status:false,message:"book with same title present"})



    // excerpt=excerpt.trim() 
    // if(!validString(excerpt))return res.status(400).send({status:false,message:"excerpt string containing number"})
    if(!isValid(excerpt))return res.status(400).send({status:false,message:"excerpt should be string"})

    
    // userId=userId.trim()
    // if(!isValid(userId))return res.status(400).send({status:false,message:"userId should be string"})
    if(!isValidObjectId(userId))return res.status(400).send({status:false,message:"userid is not valid"})
    let user=await UserModel.findOne({_id:userId})

  
    if(!user)return res.status(400).send({status:false,message:"user doesnot exist"})


    // ISBN =ISBN.trim()
    // if(!isValid(ISBN))return res.status(400).send({status:false,message:"ISBN should be string"})
    // if(!ValidISBN(ISBN))return res.status(400).send({status:false,message:"ISBN is not valid"})
    let deta=await BookModel.findOne({ISBN})
    if(deta) return res.status(400).send({status:false,message:"book with same ISBN present"})


    // category=category.trim()
    // if(!isValid(category))return res.status(400).send({status:false,message:"category should be string"})
    if(!validString(category))return res.status(400).send({status:false,message:"category string containing number"})
        
    
    
    // subcategory=subcategory.trim()
    // if(!isValid(subcategory))return res.status(400).send({status:false,message:"subcategory should be string"})
    if(!validString(subcategory))return res.status(400).send({status:false,message:"subcategory string containing number"})


    let today = new Date().toISOString().slice(0,10)
    let createdBook=await BookModel.create({title,excerpt,userId,ISBN,category,subcategory,releasedAt:today})
    
    res.status(201).send({status:true,data:createdBook})
    
} catch (error) {
    res.status(500).send({status:false,message:error.message})
}

}
//==================================================================================================================
//==================================================================================================================
//==================================================================================================================




let getbook=async(req,res)=>{
    try {
   
        let { userId, category, subcategory } = req.query;
        
        let filters = {};
        
        if (userId){ filters.userId = userId;}
        if (category) {filters.category = category;}
        if (subcategory) {filters.subcategory = subcategory;}
        
        let books = await BookModel.find({ isDeleted: false,...filters})
        .select({__v:0,createdAt:0,updatedAt:0})
        .sort({ title: "asc" });
    


        if (books.length === 0) {
            return res.status(404).send({
              status:false,
              message: 'No books found.',
            });
          }

        res.status(200).send({status:true , message:"Books list",data:books})  
        
    } catch (error) {
        res.status(500).send({status:false,message:error})
    }
}

//==================================================================================================================
//==================================================================================================================
//==================================================================================================================


let getBookDetails = async (req, res) =>{
    try {
        let { bookId } = req.params;
        let book = await BookModel.findOne({_id:bookId});
        if (!book) {
            return res.status(404).send({status:false , message: 'Book not found' });
          }
          
       let data= await BookModel.aggregate([
        {$lookup:{
        from: "reviewmodels",
        localField: "_id",
        foreignField: "bookId",
        as: "reviewsData"
    }}])

     res.status(200).send({status:true,data})
        }
    catch (error) {
        return res.status(500).send({status:false,message:error});
    }
}

//==================================================================================================================
//==================================================================================================================
//==================================================================================================================


let updateBook = async (req, res) => {
    let { bookId } = req.params;
    if(!isValidObjectId(bookId))return res.status(400).send({status:false,message:"invalid objectid in paramas"})
    let { title, excerpt, releaseDate, ISBN } = req.body;
  
    try {

      let book = await BookModel.findOne({ _id: bookId, isDeleted: false });
  
      if (!book) {

        return res.status(404).send({status:false,message: 'Book not found' });
      }

         //===========Authantication================================================
     if(book.userId!=req.head)return res.status(401).send({status:false,message:"you are not autharize for updating this book"})

     //=========================================================================


      if(title){

        // title=title.trim()
        // if(!isValid(title))return res.status(400).send({status:false,message:"title should be string"})
        let data=await BookModel.findOne({title})
        if(data) return res.status(400).send({status:false,message:"book with same title present"})
        book.title = title;
      }
      if(excerpt){
        excerpt=excerpt.trim() 
        if(!validString(excerpt))return res.status(400).send({status:false,message:"excerpt string containing number"})
        if(!isValid(excerpt))return res.status(400).send({status:false,message:"excerpt should be string"})

        book.excerpt = excerpt;
      }
      if(releaseDate){

         if(!isValidDate(releaseDate))return res.status(400).send({status:false,message:"date shoud be in YYYY-MM-DD formate"})

        book.releaseDate = releaseDate;
      }
      if(ISBN){
        ISBN =ISBN.trim()
        if(!isValid(ISBN))return res.status(400).send({status:false,message:"ISBN should be string"})
        if(!ValidISBN(ISBN))return res.status(400).send({status:false,message:"ISBN is not valid"})
        let deta=await BookModel.findOne({ISBN})
        if(deta) return res.status(400).send({status:false,message:"book with same ISBN present"})
        book.ISBN = ISBN;

      }

 
      
      let updatedBook = await book.save();
  
      // Return the updated book
      return res.status(200).send({status:true,message:"updated true", data: updatedBook });
    } catch (error) {

      return res.status(500).send({status:false, message:error});
    }
  };

  
//==================================================================================================================
//==================================================================================================================
//==================================================================================================================


let deleteBook=async(req,res)=>{
  
  let {bookId}=req.params;
  try {
    if(!isValidObjectId(bookId))return res.status(400).send({status:false,message:"invalid objectid in paramas"})
    let data=await BookModel.findOne({_id:bookId})
    if(!data)return res.status(400).send({status:false,message:"Book doesnot exist of this id"})
    //===========Authantication=============================================================================================
    if(data.userId!=req.head)return res.status(401).send({status:false,message:"you are not autharize for deleting this book"})
    
    //======================================================================================================================
    if(data.isDeleted==true)return res.status(400).send({status:false,message:"book already deleted"})
 
    data.isDeleted=true;

    await data.save();
    res.status(200).send({status:true,message:"Deleted Succesfully"})
    
    } catch (error) {
        return res.status(500).send({status:false, message:error.message});
        
    }

}

//==================================================================================================================
//==================================================================================================================
//==================================================================================================================







module.exports={createBook,getbook,getBookDetails,updateBook,deleteBook}