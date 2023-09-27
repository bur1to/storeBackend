const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { userCreateValidation, userUpdateValidation } = require('../validations/userValidation');

const getUsers = async (req, res, next) => {
  try {
    const data = await User.find({}, {
      firstName: 1,
      lastName: 1,
      email: 1
    });

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id }, {
      firstName: 1,
      lastName: 1,
      email: 1
    });

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const createParams = await userCreateValidation(body);

    const existUser = await User.findOne({ email: createParams.email });

    if (existUser) {
      res.status(409).send('User with this email already exist. Please login');
    }

    const salt = crypto.randomBytes(16).toString('hex');

    createParams.password = crypto.pbkdf2Sync(createParams.password, salt, 1000, 64, 'sha512').toString('hex');
    createParams.confirmPassword = crypto.pbkdf2Sync(createParams.confirmPassword, salt, 1000, 64, 'sha512').toString('hex');
    createParams.salt = salt;

    const newUser = await User.create(createParams);

    const { _id, email } = newUser;

    const token = jwt.sign(
      { user_id: _id, email },
      `${process.env.TOKEN_KEY}`,
      {
        expiresIn: '2h'
      }
    );

    newUser.token = token;

    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateParams = await userUpdateValidation(body);

    if (body.password) {
      const salt = crypto.randomBytes(16).toString('hex');

      updateParams.password = crypto.pbkdf2Sync(updateParams.password, salt, 1000, 64, 'sha512').toString('hex');
      updateParams.confirmPassword = crypto.pbkdf2Sync(updateParams.confirmPassword, salt, 1000, 64, 'sha512').toString('hex');
      updateParams.salt = salt;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateParams, { new: true });

    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    await User.deleteOne({ _id: id });

    res.status(200).send('User is deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
