const router = require('express').Router();
const {
  createProduct,
  listAllProducts,
  listProductById,
  updateProductById,
} = require('../controllers/product');
const { validateToken } = require('../middlewares/validateToken');

router.post('/', validateToken, createProduct);
router.get('/', validateToken, listAllProducts);
router.get('/:id', validateToken, listProductById);
router.put('/:id', validateToken, updateProductById);

module.exports = router;
