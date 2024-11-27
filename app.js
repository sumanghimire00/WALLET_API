const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");


require("dotenv").config();


const app = express();

mongoose.connect(process.env.mongo_connect, {}).then(() => {
    console.log("Connected to mongodb sucessfully!");

}).catch((e) => {
    console.log("Failed to connect mongodb", e);
});

// Routes

app.use("/users",userRouter);


app.listen(8000, () => {
    console.log("Server started sucessfully");
});
