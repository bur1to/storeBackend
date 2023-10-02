const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email });

    if (!user) {
      throw new Error('Incorrect email');
    }

    const { salt } = user;

    const hashedPassword = crypto.pbkdf2Sync(body.password, salt, 1000, 64, 'sha512').toString('hex');

    if (user.password !== hashedPassword) {
      throw new Error('Incorrect password');
    }

    const { _id, email } = user;

    const token = jwt.sign(
      { user_id: _id, email },
      `${process.env.TOKEN_KEY} `,
      {
        expiresIn: '2h'
      }
    );

    user.token = token;

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports = login;
