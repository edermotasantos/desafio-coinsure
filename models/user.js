const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
  }, {
      timestamps: false,
  });
  user.associate = (models) => {
      user.hasMany(models.Products, { as: 'product', foreignKey: 'userId' });
  };
  return user;
};

module.exports = User;