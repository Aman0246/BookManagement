let {ReviewModel}=require("../Models/ReviewModel")
let{BookModel}=require("../Models/BookModel");
let { isValidObjectId } = require("mongoose");
let{isValid,validString}=require("../Utils")

//===================================================================================================================
//===================================================================================================================
//===================================================================================================================

let addReviewToBook=async(req,res)=>{
  try {
    let { bookId } = req.params;
    if(!bookId) return res.status(400).send({status:false,message:"BookId is not in params"})
    if(!isValidObjectId(bookId))return res.status(400).send({status:false,message: "bookid is not valid"})

    console.log(bookId)
    let book = await BookModel.findOne({ _id: bookId, isDeleted: false });





    if (!book) {
      return res.status(404).send({status:false, message: 'Book not found' });
    }


    let { review, rating, reviewerName } = req.body;


    if(!review)return res.status(400).send({status:false,message:"please provide review"})
     if(!isValid(review))return res.status(400).send({status:false,message:"lease provide review in string as it coontp"})

    
 
     if(!rating)return res.status(400).send({status:false,message:"please provide rating"})
     if(typeof rating!="number" || rating >6 || rating<0)return res.status(400).send({status:false,message:"please provide rating in number and  between  1 to 5"})



     if(!reviewerName)return res.status(400).send({status:false,message:"please provide reviewerName"})
     if(!isValid(reviewerName))return res.status(400).send({status:false,message:"please provide reviewerName in string"})
     if(!validString(reviewerName))return res.status(400).send({status:false,message:" reviewerName : name contain number"})


    
      let CreateReview=await ReviewModel.create({ review, rating, reviewedBy:reviewerName,bookId:bookId})

      book.reviews++
      
      await book.save()
      book=book.toObject()
      book.reviewsData=CreateReview



      return res.status(200).send({status:true,message:"Review added successfully",data:book });
    } catch (error) {
      return res.status(500).send({status:false , message:error});
    }
}

//=========================================================================================================================================================
//=========================================================================================================================================================
//=========================================================================================================================================================

let updateReview =async(req,res)=>{
  try {
    let{bookId,reviewId}=req.params
    
    if(!bookId)return res.status(400).send({status:false,message: "bookid is not avaliable in param"})
    if(!reviewId)return res.status(400).send({status:false,message: "reviewId is not avaliable in param"})

    if(!isValidObjectId(bookId))return res.status(400).send({status:false,message: "bookid is not valid"})
    if(!isValidObjectId(reviewId))return res.status(400).send({status:false,message: "reviewId is not valid"})
        

    let book = await BookModel.findOne({ _id: bookId, isDeleted: false });
    if(!book)return res.status(400).send({status:false,message:"book is not avavliable"})
 
     
    let reviews = await ReviewModel.findOne({ _id: reviewId, isDeleted: false });
    if(!reviews)return res.status(400).send({status:false,message:"review is not avaliable"})
    


    let{review, rating, reviewerName }=req.body
    
    
    
     if(review){
    if(!isValid(review))return res.status(400).send({status:false,message:"lease provide review in string as it coontp"})
    reviews.review=review
     }
    
     if(rating){
    if(typeof rating!="number" || rating >6 || rating<0)return res.status(400).send({status:false,message:"please provide rating in number and  between  1 to 5"})
    reviews.rating=rating
  }
   if(reviewerName){
    if(!isValid(reviewerName))return res.status(400).send({status:false,message:"please provide reviewerName in string"})
    if(!validString(reviewerName))return res.status(400).send({status:false,message:" reviewerName : name contain number"})
    reviews.reviewedBy=reviewerName
   }

    // Save the updated book document
    await reviews.save();
     
   book= book.toObject()
   let reviewsData =await ReviewModel.find({bookId,isDeleted:false})
   book.reviewsData=reviewsData
    

    return res.status(200).send({status:true,message:"Updated Successfully" ,Data:{book} });

    
  } catch (error) {
    return res.status(500).send({status:false , message:error});
  }
}

//=========================================================================================================================================================
//=========================================================================================================================================================
//=========================================================================================================================================================
let deleteReview =async(req,res)=>{
  try {
    let{bookId,reviewId}=req.params
    

    if(!isValidObjectId(bookId))return res.status(400).send({status:false,message: "bookid is not valid"})
    if(!isValidObjectId(reviewId))return res.status(400).send({status:false,message: "bookid is not valid"})
        

    let book = await BookModel.findOne({ _id: bookId, isDeleted: false });
    if(!book)return res.status(400).send({status:false,message:"book is not avavliable"})
    
    
    let reviews = await ReviewModel.findOne({ _id: reviewId, isDeleted: false });
    if(!reviews)return res.status(400).send({status:false,message:"review is not avavliable"})


    reviews.isDeleted=true
    book.reviews--

    await reviews.save();
    await book.save();

    return res.status(200).send({status:true,message:"Review Deleted"});

  } catch (error) {
    return res.status(500).send({status:false , message:error}); 
  }
}


module.exports={addReviewToBook,updateReview,deleteReview }