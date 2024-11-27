const userLogin =(req,res)=>{
    res.status(200).json({
        status: "Hello UserLogin",
    });
};

module.exports= userLogin;
