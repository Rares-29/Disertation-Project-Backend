const { DataTypes } = require('sequelize');
const sequelize = require('../db/sqlConnection');

const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.STRING(20), allowNull: false },
}, { tableName: 'User', timestamps: false });

module.exports = User;
