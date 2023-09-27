const express = require('express');

const router = express.Router();

const {
  getGoods,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/goods');

router.get('/', getGoods);
router.get('/:id', getProduct);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
