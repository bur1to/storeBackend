const Joi = require('joi');

const goodsCreateValidation = (data) => {
  const createSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().min(40).required(),
    price: Joi.number().required(),
    available: Joi.string().required(),
    used: Joi.boolean().required()
  });

  return createSchema.validateAsync(data);
};

const goodsUpdateValidation = (data) => {
  const updateSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().min(40).required(),
    price: Joi.number().required(),
    available: Joi.string().required(),
    used: Joi.boolean().required()
  });

  return updateSchema.validateAsync(data);
};

module.exports = {
  goodsCreateValidation,
  goodsUpdateValidation
};
