const Student = sequelize.define('Student', {
    student_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    first_name: { type: DataTypes.STRING(100), allowNull: false },
    last_name: { type: DataTypes.STRING(100), allowNull: false },
    series: { type: DataTypes.INTEGER },
    class_group: { type: DataTypes.INTEGER },
    extra_year: { type: DataTypes.INTEGER },
    program_id: { type: DataTypes.INTEGER, allowNull: false },
  }, { tableName: 'Student', timestamps: false });
  
  module.exports = Student;