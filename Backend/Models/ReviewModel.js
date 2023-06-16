const { default: mongoose } = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {


        bookId: {type:ObjectId, require:true, refs:"BookModel"},
        reviewedBy: {type:String, require:true, default:'Guest'},
        // , value: reviewer's name
        reviewedAt: {type:Date, require:true},
        rating: {type:Number, min:1, max:5, require:true},
        review: {type:String, require:true},
        isDeleted: {type:Boolean, default: false}
   
   },
    { timestamps: true }
  );  
  
  const ReviewModel = new mongoose.model("ReviewModel", ReviewSchema);
  
  module.exports = { ReviewModel };