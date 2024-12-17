const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/sqlConnection');


const Notification = sequelize.define('Notification', {
    notification_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sender_id: { type: DataTypes.INTEGER, allowNull: false },
    receiver_id: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.STRING(255), allowNull: false },
  }, { tableName: 'Notification', timestamps: false });
  
  module.exports = Notification;