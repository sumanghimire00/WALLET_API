const db = require("../../../models");

const addIncome = async (req, res) => {
    const User = db.users;
    const Transaction = db.transactions;
    const { amount, remarks } = req.body;

    try {
        if (!amount) throw new Error("Please enter amount");
        if (amount < 1) throw new Error("Amount must be more than 1");

        if (!remarks) throw new Error("Remarks is required");
        if (remarks.length < 2) throw new Error("Remarks must be at least two characters");

        // Transaction block to ensure consistency
        const result = await db.sequelize.transaction(async (t) => {
            const newTransaction = await Transaction.create({
                amount: amount,
                remarks: remarks,
                user_id: req.user.id,
                transaction_type: "income",
            }, { transaction: t });

            await User.increment('balance', {
                by: amount,
                where: { id: req.user.id },
                transaction: t
            });
            
            return newTransaction;
        });

        res.status(200).json({
            status: "success",
            message: "Income was added",
            data: result
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message,
        });
    }
};

module.exports = addIncome;