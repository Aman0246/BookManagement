let { UserModel } = require("../Models/UserModel");
var jwt = require('jsonwebtoken');
let {
  isValid,
  validString,
  isValidPassword,
} = require("../Utils");
let validator = require("validator");
let { Validator } = require("format-utils");
const { response } = require("express");

let registration = async (req, res) => {
  let { title, name, phone, email,password, address } = req.body;
  try {
 
    if (
      !isValid(title) ||
      !isValid(name)  ||
      !isValid(phone) ||
      !isValid(email) ||
      !isValid(password)
    )
      return res.status(400).send({ status: false, message: "Empty filde or not in string" });

      

    name = name.trim();
    if (!validString(name))
      return res
        .status(400)
        .send({ status: false, message: "name contain number" });



    title = title.trim();
    if (!["Mr", "Mrs", "Miss"].includes(title))
      return res
        .status(400)
        .send({ status: false, message: "titile:[Mr, Mrs, Miss]" });




    phone = phone.trim();
    if (!Validator.mobile(phone))
      return res
        .status(400)
        .send({ status: false, message: "phoneNumber invalid" });




    email = email.trim();
    if (!validator.isEmail(email))
      return res.status(400).send({ status: false, message: "email invalid" });


      
    // password = password.trim();
    // if (!isValidPassword(password))
    //   return res
    //     .status(400)
    //     .send({
    //       status: false,
    //       message: "password must be 8 to 15  character long a-z and number ",
    //     });


        
     pincode=address.pincode.trim()
    if (!Validator.pincode(address.pincode))
      return res
        .status(400)
        .send({ status: false, message: "pincode must be in number length=6" });




    let oldUser = await UserModel.findOne({ phone } || { email });
    if (oldUser)
      return res
        .status(400)
        .send({ status: false, message: "user already exist with same phone or email" });
    else {
      let newuser = await UserModel.create(req.body);
      return res
        .status(201)
        .send({ status: true, data: newuser });
    }



  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================
//==================================================================================================================================

let login=async(req,res)=>{
    try {
        let{email,password}=req.body
        
      if(!email)  return res.status(400).send({ status: false, message: "email not present" });
       email = email.trim();
       if (!validator.isEmail(email))
      return res.status(400).send({ status: false, message: "email invalid" });

      if(!password)  return res.status(400).send({ status: false, message: "password not present" });
        
      // password = password.trim();
      // if (!isValidPassword(password))
      //   return res
      //     .status(400)
      //     .send({
      //       status: false,
      //       message: " password invalid minlength-8,maxlength-15 number and a-z",
      //     });


      let user=await UserModel.findOne({email})
      if(!user)   return res.status(400).send({ status: false, message: "user is not Registerd" });   

      if(user.password!=password)  return res.status(401).send({ status: false, message: "Wrong Password" })

      var token = jwt.sign({ userid:user._id}, 'shhhhh',{expiresIn: '2d'});
      res.cookie("token",token)    
      res.status(200).send({ status: true,data:{"token":token} });

        
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = { registration,login };
