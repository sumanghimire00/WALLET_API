
const mongoose = require("mongoose");
const addExpense = async (req, res) => {
    const Users = mongoose.model("users");


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

    await Users.updateOne({
        _id: req.user._id,
    },
        {
            $inc:{
                balance: amount *-1,
            }
        }, {
        runValidators: true,
    },
    );

    res.status(200).json({
        status: "Expenses was added",
    });
};

module.exports = addExpense;