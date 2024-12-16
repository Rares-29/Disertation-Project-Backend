const AttachedFiles = sequelize.define('Attached_Files', {
    file_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    request_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(50), allowNull: false },
    extension: { type: DataTypes.STRING(15), allowNull: false },
    content: { type: DataTypes.BLOB, allowNull: false },
    date_added: { type: DataTypes.DATE },
    added_by: { type: DataTypes.DATE },
  }, { tableName: 'Attached_Files', timestamps: false });
  
  module.exports = AttachedFiles;