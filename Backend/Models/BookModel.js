const { default: mongoose } = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
      trim: true,
    },
    ISBN: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, required: true, trim: true },
    reviews: { type: Number, default: 0, trim: true },
    deletedAt: { type: Date, trim: true },
    isDeleted: { type: Boolean, default: false, trim: true },
    releasedAt: { type: Date, required: true, trim: true },
    },
  { timestamps: true }
);

const BookModel = new mongoose.model("BookModel", BookSchema);

module.exports = { BookModel };
