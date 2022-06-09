const Product = (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
  }, {
      timestamps: false,
  });
  product.associate = (models) => {
      product.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };
  return product;
};

module.exports = Product;
