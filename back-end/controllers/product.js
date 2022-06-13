const product = require('../services/product');
const {
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
} = require('../schemas/statusCodes');

const {
  tryAgainLater,
  productDoesntExist,
  titleIsRequired,
  descriptionIsRequired,
  priceIsRequired,
} = require('../schemas/messages');

const createProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const { id } = req.user;
    const productData = await product.createProduct({ title, description, price, id });
    if (productData.err) {
      const { statusCode, message } = productData.err;
      return res.status(statusCode).json({ message });
    }
    return res.status(CREATED).json(productData);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

const listAllProducts = async (req, res) => {
  try {
    const allProductsFound = await product.listAllProducts();
    return res.status(OK).json(allProductsFound);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

const listProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productFoundById = await product.listProductsById(id);
    if (!productFoundById) return res.status(NOT_FOUND).json({ message: productDoesntExist });
    return res.status(OK).json(productFoundById);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: tryAgainLater });
  }
};

const updateProductById = async (req, res) => {
  const { title, description, price } = req.body;
  const { id } = req.params;
  const { email } = req.user;
  const productFoundById = await product.updateProductById(
    { id, title, description, price, email },
  );
  if (!title) return res.status(BAD_REQUEST).json({ message: titleIsRequired });
  if (!description) return res.status(BAD_REQUEST).json({ message: descriptionIsRequired });
  if (!price) return res.status(BAD_REQUEST).json({ message: priceIsRequired });
  if (productFoundById.err) {
    const { statusCode, message } = productFoundById.err;
    return res.status(statusCode).json(message);
  }
  return res.status(OK).json(productFoundById);
};

module.exports = {
  createProduct,
  listAllProducts,
  listProductById,
  updateProductById,
};
