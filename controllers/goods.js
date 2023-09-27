const Goods = require('../models/goods');
const {
  goodsCreateValidation,
  goodsUpdateValidation
} = require('../validations/goodsValidation');

const getGoods = async (req, res, next) => {
  try {
    const data = await Goods.find({});

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Goods.findOne({ _id: id });

    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { body } = req;

    const createParams = await goodsCreateValidation(body);

    const newProduct = await Goods.create(createParams);

    res.status(200).send(newProduct);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateParams = await goodsUpdateValidation(body);

    const updatedProduct = await Goods.findByIdAndUpdate(id, updateParams, { new: true });

    res.status(200).send(updatedProduct);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Goods.deleteOne({ _id: id });

    res.status(200).send('Product is successfully deleted!');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getGoods,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
