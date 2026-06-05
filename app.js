const express = require("express");
const userRouter = require("./modules/users/users.routes");
const incomeRouter = require("./modules/income/income.routes");
const expenseRouter = require("./modules/expenses/expense.routes");
const cors = require("cors");
const db = require("./models");

require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors({
    origin:"*",
    methods :"GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"
}));

// Sync MySQL database
db.sequelize.sync({ alter: true }).then(() => {
    console.log("Connected to MySQL DB successfully and models synchronized!");
}).catch((e) => {
    console.log("Failed to connect to MySQL database", e);
});

// Routes
app.use("/users", userRouter);
app.use("/income", incomeRouter);
app.use("/expense", expenseRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
