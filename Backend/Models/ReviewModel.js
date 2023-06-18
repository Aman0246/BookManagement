const { default: mongoose } = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {


        bookId: {type:mongoose.Schema.Types.ObjectId, required:true, refs:"BookModel",trim:true  },
        reviewedBy: {type:String, required:true, default:'Guest',trim:true  },
        // , value: reviewer's name
        reviewedAt: {type:Date,default:new Date()},
        rating: {type:Number, min:1, max:5, required:true,trim:true  },
        review: {type:String, required:true,trim:true },
        isDeleted: {type:Boolean, default: false}
   
   },
    { timestamps: true }
  );  
  
  const ReviewModel = new mongoose.model("ReviewModel", ReviewSchema);
  
  module.exports = { ReviewModel };