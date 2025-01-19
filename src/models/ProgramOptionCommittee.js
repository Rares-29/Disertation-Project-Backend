const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/sqlConnection');


const ProgramOptionCommittee = sequelize.define('Program_Option_Commitee', {
    program_id: { type: DataTypes.INTEGER, primaryKey: true},
    committee_id: { type: DataTypes.INTEGER, primaryKey: true}
  }, { tableName: 'Program_Option_Committee', timestamps: false });
  
module.exports = ProgramOptionCommittee;