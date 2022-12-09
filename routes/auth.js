const routerAuth = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const { login, createUser } = require('../controllers/users');
const { createAccountLimiter } = require('../middlewares/limiter');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

routerAuth.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(method),
    email: Joi.string().required().email().pattern(/^\S+@\S+\.\S+$/),
    password: Joi.string().required().min(4).max(36),
  }),
}), createAccountLimiter, createUser);

routerAuth.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required().max(36),
  }),
}), login);

module.exports = routerAuth;
