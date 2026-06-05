const db = require("../../../models");

const userDashboard = async (req, res) => {
    const User = db.users;
    const Transaction = db.transactions;

    try {
        const getUserData = await User.findOne({
            where: { id: req.user.id },
            attributes: ['balance', 'name']
        });

        const getTransactions = await Transaction.findAll({
            where: { user_id: req.user.id },
            order: [['createdAt', 'DESC']],
            attributes: ['remarks', 'amount', 'transaction_type'],
            limit: 5
        });

        res.status(200).json({
            data: getUserData,
            transactions: getTransactions,
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        });
    }
};

module.exports = userDashboard;
