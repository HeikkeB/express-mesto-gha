/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Authorization required'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'fc940a6da342577ec7ecc725c90a5037');
  } catch (error) {
    return next(new Unauthorized('Authorization required!'));
  }

  req.user = payload;
  return next();
};
