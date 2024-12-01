const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, "Amount is required"],
        },
        remarks: {
            type: String,
            required: [true, "Remarks is required"],
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        transaction_type: {
            type: String,
            enum:["income","expense"],
            required: [true, "Type is required"],
        },
    },
    {
        timestamps: true,
    },
);

const transcationModel = mongoose.model("transactions", transactionSchema);
module.exports = transcationModel; 