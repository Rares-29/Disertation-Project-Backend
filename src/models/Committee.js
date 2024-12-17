const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/sqlConnection');


const Committee = sequelize.define('Committee', {
    committee_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.STRING(500) },
  }, { tableName: 'Committee', timestamps: false });
  
  module.exports = Committee;