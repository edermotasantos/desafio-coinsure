const { product } = require('../models');
const { user } = require('../models');
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

  const productCreated = await product.create({ title, description, price, userId: id });
  const productFound = await product.findByPk(productCreated.dataValues.id, {
    attributes: { exclude: ['published', 'updated'] },
  });
  return productFound;
};

const listAllProducts = async () => {
  const allProductFound = await product.findAll({
    include: [
      { model: user, as: 'user' },
    ],
  });
  return allProductFound;
};

const listProductById = async (id) => {
  const productFoundById = await product.findOne({
      where: { id },
      include: [
        { model: user, as: 'user' },
      ],
  });
  return productFoundById;
};

const updateProductById = async ({ id, title, description, price, email }) => {
  const productFound = await product.findOne({ where: { id }, include: [{ all: true }] });
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
