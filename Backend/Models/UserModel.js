const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    title: { typr: String, require: true, enum: [Mr, Mrs, Miss] },
    name: { type: String, require: true },
    phone: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, minlength: 8, maxlength: 15 },
    address: {
      street: { type: String },
      city: { type: String },
      pincode: { type: String, minlength: 6, maxlength: 6 },
    },
  },
  { timestamps: true }
);  

const UserModel = new mongoose.model("UserModel", UserSchema);

module.exports = { UserModel };
