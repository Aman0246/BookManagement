const { default: mongoose } = require("mongoose");

const BookSchema = new mongoose.Schema(
    {
        title: {type:String, require:true, unique:true},
        excerpt: {type:String, require:true}, 
        userId: {type:mongoose.Schema.Types.ObjectId, require:true, ref:"UserModel"},
        ISBN: {type:String, require:true, unique:true},
        category: {type:String, require:true},
        subcategory: {type:String, require:true},
        reviews: {type:Number, default: 0},
        // comment: Holds number of reviews of this book
        deletedAt: {type:Date}, 
        isDeleted: {type:Boolean, default: false},
        releasedAt: {type:Date, require:true},
   },
    { timestamps: true }
  );  
  
  const BookModel = new mongoose.model("BookModel", BookSchema);
  
  module.exports = { BookModel };