module.exports = (sequelize, DataTypes) => {
  const ToDo = sequelize.define('ToDo', {
    subject: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    dueDate: DataTypes.DATE,
  }, {});
  ToDo.associate = (models) => {
    // associations can be defined here
    ToDo.belongsTo(models.User);
  };
  return ToDo;
};
