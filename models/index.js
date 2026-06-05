const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'wallet',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./users.model')(sequelize, Sequelize);
db.transactions = require('./transaction.model')(sequelize, Sequelize);

// Associations
db.users.hasMany(db.transactions, { foreignKey: 'user_id' });
db.transactions.belongsTo(db.users, { foreignKey: 'user_id' });

module.exports = db;
