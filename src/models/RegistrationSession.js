const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/sqlConnection');


const RegistrationSession = sequelize.define('Registration_Session', {
    session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    teacher_id: { type: DataTypes.INTEGER, allowNull: false },
    open_seats: { type: DataTypes.INTEGER, allowNull: false },
    remaining_seats: { type: DataTypes.INTEGER, allowNull: false },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
  }, { tableName: 'Registration_Session', timestamps: false });
  
  module.exports = RegistrationSession;