const express = require("express");
const userRegister = require("./controllers/userRegister");
const userLogin = require("./controllers/userLogin");
const userDashboard = require("./controllers/userDashboard");
const auth = require("../../middleware/auth");
const userRouter = express.Router();

// Public Route
userRouter.post("/register",userRegister);
userRouter.post("/login",userLogin);


// Protected Route
//   Middle ware for given excess todashboard or not? 
userRouter.use(auth);
userRouter.get("/dashboard",userDashboard);

module.exports =userRouter;