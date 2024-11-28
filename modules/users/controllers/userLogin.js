const mongoose = require("mongoose");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");

const userLogin =async(req,res)=>{

    const Users = mongoose.model("users");

    const {email,password}=req.body;


    // validation
      try{
        if(!email) throw "Please provide a email";
        if(!password) throw "Please provide a password";


        // checking for email and pasword is available on database or not???

        const getUser = await Users.findOne({
                email:email,
        });
        if(!getUser) throw "User doesnot exits";
        const matched =await bcrypt.compare(password,getUser.password);

        if(!matched) throw "Email and Password do not match";

      }
      catch(e){
        res.status(400).json({
            status:"failed",
            message:e,
        });
        return;
      };

    // sucessfull methods
    
    const getUserForAccessToken = await Users.findOne({
        email:email,
})
    const accessToken= jwt.sign({
        email:getUserForAccessToken.email,
        name: getUserForAccessToken.name,
    },
   process.env.jwt_salt,{
    expiresIn:"90 days"
   },
);

    res.status(200).json({
        status: "User logged in successfully!!",
        accessToken
    });
};

module.exports= userLogin;
