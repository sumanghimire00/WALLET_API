const mongoose = require("mongoose");
const bcrypt =require("bcrypt");



const userRegister = async (req, res) => {
    const Users = mongoose.model("users");
    const { name, email, password, address, balance } = req.body;

    // validation

    // Creation code for user
    const encPassword =await bcrypt.hash(password,10);
    try{

        const createUser = await Users.create({
            name,
            email,
            password:encPassword, 
            address,
            balance,
    
        });
    }
    catch(e){
        res.status(400).json({
            status:"failed!",
            message:e.message,
        });
        return
    };

    res.status(200).json({
        status: "Hello Register",
    });
};

module.exports = userRegister;
