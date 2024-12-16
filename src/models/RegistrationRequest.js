const RegistrationRequest = sequelize.define('Registration_Request', {
    request_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    student_id: { type: DataTypes.INTEGER, allowNull: false},
    teacher_id: { type: DataTypes.INTEGER, allowNull: false},
    message: { type: DataTypes.STRING(3000), allowNull: true},
    reject_message: { type: DataTypes.STRING(3000), allowNull: true},
    status: { type: DataTypes.STRING(1), allowNull: false},
}, { tableName: 'Registration_Request', timestamps: false });
  
  module.exports = RegistrationRequest;