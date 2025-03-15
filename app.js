const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./modules/users/users.routes");
const incomeRouter = require("./modules/income/income.routes");
const expenseRouter = require("./modules/expenses/expense.routes");
const cors =require("cors");

require("dotenv").config();


const app = express();
// For json Use
app.use(express.json());

// / Enable CORS to allow frontend to communicate with backend
app.use(cors({
    origin:"*",
    methods :"GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));


// Models

require("./models/users.model");
require("./models/transaction.model");

mongoose.connect(process.env.mongo_connect, {}).then(() => {
    console.log("Connected to mongodb sucessfully!");

}).catch((e) => {
    console.log("Failed to connect mongodb", e);
});

// Routes

app.use("/users",userRouter);
app.use("/income",incomeRouter);
app.use("/expense",expenseRouter);



const PORT =process.env.PORT||8000
app.listen(PORT, () => {
    console.log("Server started sucessfully");
});
