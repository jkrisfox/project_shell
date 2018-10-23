module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.ToDo);
    User.hasOne(models.Session);
  };
  return User;
};
