
const mongoose = require("mongoose");
const addExpense = async (req, res) => {
    const Users = mongoose.model("users");
    const Transaction = mongoose.model("transactions");


    const { amount, remarks } = req.body;

    // Sucess.......................
    try {
        if (!amount) throw "Please enter amount";
        if (amount < 1) throw "Amount must be more than 1";

        if (!remarks) throw "Remarks is required";
        if (remarks.length < 2) throw "Remarks must be atleast to be 2 char";
    }
    catch (e) {
        res.status(400).json({
            status: "failed",
            message: e,
        });
        return;
    };
    // sucesss.......

    try {

        await Users.updateOne({
            _id: req.user._id,
        },
            {
                $inc: {
                    balance: amount * -1,
                }
            }, {
            runValidators: true,
        },
        );

        await Transaction.create({
            user_id: req.user._id,
            transaction_type: "expense",
            remarks: remarks,
            amount: amount,
        })

    }
    catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message,
        });
        return;
    };



    res.status(200).json({
        status: "Expenses was added",
    });
};

module.exports = addExpense;