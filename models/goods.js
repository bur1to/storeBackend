const mongoose = require('mongoose');

const goodsSchema = mongoose.Schema({
  name: { type: String },
  category: { type: String },
  description: { type: String, minLength: 40 },
  price: { type: Number },
  available: { type: String },
  used: { type: Boolean }
}, {
  collection: 'goods',
  versionKey: false
});

const Goods = mongoose.model('Goods', goodsSchema);

module.exports = Goods;
