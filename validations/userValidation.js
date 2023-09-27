const Joi = require('joi');

const userCreateValidation = (data) => {
  const createValidation = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]{8,30}$/).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  });

  return createValidation.validateAsync(data);
};

const userUpdateValidation = (data) => {
  const updateValidation = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]{8,30}$/),
    confirmPassword: Joi.ref('password')
  });

  return updateValidation.validateAsync(data);
};

module.exports = {
  userCreateValidation,
  userUpdateValidation
};
