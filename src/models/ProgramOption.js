const ProgramOption = sequelize.define('Program_Option', {
    program_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    added_by: { type: DataTypes.DATE },
    added_at: { type: DataTypes.DATE },
  }, { tableName: 'Program_Option', timestamps: false });
  
  module.exports = ProgramOption;