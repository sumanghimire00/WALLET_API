module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        remarks: {
            type: Sequelize.STRING,
            allowNull: false
        },
        transaction_type: {
            type: Sequelize.ENUM('income', 'expense'),
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    });

    return Transaction;
};