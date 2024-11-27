const express = require("express");
const userRegister = require("../../controllers/userRegister");
const userLogin = require("../../controllers/userLogin");
const userRouter = express.Router();


userRouter.get("/register",userRegister);
userRouter.get("/login",userLogin);

module.exports =userRouter;