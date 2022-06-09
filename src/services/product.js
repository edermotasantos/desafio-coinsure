const Product = require('../models/product');
const User = require('../models/user');
const {
  titleIsRequired,
  descriptionIsRequired,
  priceIsRequired,
  unauthorizedUser,
} = require('../schemas/messages');
const { BAD_REQUEST, UNAUTHORIZED } = require('../schemas/statusCodes');

const createProduct = async ({ title, description, price, id }) => {
  if (!title) return { err: { statusCode: BAD_REQUEST, message: titleIsRequired } };
  if (!description) return { err: { statusCode: BAD_REQUEST, message: descriptionIsRequired } };
  if (!price) return { err: { statusCode: BAD_REQUEST, message: priceIsRequired } };

  const productCreated = await Product.create({ title, description, price, userId: id });
  const productFound = await Product.findByPk(productCreated.dataValues.id, {
    attributes: { exclude: ['published', 'updated'] },
  });
  return productFound;
};

const listAllProducts = async () => {
  const allProductFound = await Product.findAll({
    include: [
      { model: User, as: 'user' },
    ],
  });
  return allProductFound;
};

const listProductById = async (id) => {
  const productFoundById = await Product.findOne({
      where: { id },
      include: [
        { model: User, as: 'user' },
      ],
  });
  return productFoundById;
};

const updateProductById = async ({ id, title, description, price, email }) => {
  const productFound = await Product.findOne({ where: { id }, include: [{ all: true }] });
  if (productFound.dataValues.user.email !== email) {
    return { err: { statusCode: UNAUTHORIZED, message: unauthorizedUser } };
  }
  const productFoundById = await productFound.update({ title, description, price }, { where: { id } });
  return productFoundById;
};

module.exports = {
  createProduct,
  listAllProducts,
  listProductById,
  updateProductById,
};
