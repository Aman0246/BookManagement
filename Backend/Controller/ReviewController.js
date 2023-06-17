const {ReviewModel}=require("../Models/ReviewModel")
const{BookModel}=require("../Models/BookModel")

const addReviewToBook=async(req,res)=>{
    const { bookId } = req.params;
    const { review, rating, reviewedBy, } = req.body;
    
    // bookId: {type:mongoose.Schema.Types.ObjectId, required:true, refs:"BookModel",trim:true  },
    // reviewedBy: {type:String, required:true, default:'Guest',trim:true  },
    // // , value: reviewer's name
    // reviewedAt: {type:Date, required:true},
    // rating: {type:Number, min:1, max:5, required:true,trim:true  },
    // review: {type:String, required:true,trim:true },
    // isDeleted: {type:Boolean, default: false}

//     ### POST /books/:bookId/review
// - Add a review for the book in reviews collection.
// - Check if the bookId exists and is not deleted before adding the review. Send an error response with appropirate status code like [this](#error-response-structure) if the book does not exist
// - Get review details like review, rating, reviewer's name in request body.
// - Update the related book document by increasing its review count
// - Return the updated book document with reviews data on successful operation. The response body should be in the form of JSON object like [this](#Review-Response-Structure)
  
    try {
      // Check if the bookId exists and is not deleted
      const book = await BookModel.findOneAndUpdate(
        { _id: bookId, isDeleted: false },
        {
          $push: { reviews: { review, rating, reviewerName } },
          $inc: { reviewCount: 1 }
        },
        { new: true }
      );
  
      if (!book) {
        // Book not found or already deleted
        return res.status(404).send({status:false, message: 'Book not found' });
      }
  
      // Return the updated book document with reviews data
      return res.status(200).json({ book });
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error('Error adding review to book:', error);
      return res.status(500).json({ error: 'An internal server error occurred' });
    }
}