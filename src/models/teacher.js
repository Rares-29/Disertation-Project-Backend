const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/sqlConnection');


const Teacher = sequelize.define('Teacher', {
    teacher_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    first_name: { type: DataTypes.STRING(100), allowNull: false },
    last_name: { type: DataTypes.STRING(100), allowNull: false },
    students_limit: { type: DataTypes.INTEGER},
    remaining_seats: { type: DataTypes.INTEGER},
    committee_head: { type: DataTypes.INTEGER },
    committee_id: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'Teacher', timestamps: false });
  
  module.exports = Teacher;