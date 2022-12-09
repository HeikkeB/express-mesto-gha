const routerUsers = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getAllUsers, updateUser, updateAvatar, getUserMe,
} = require('../controllers/users');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

routerUsers.get('/', getAllUsers);
routerUsers.get('/me', getUserMe);
routerUsers.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
routerUsers.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(method),
  }),
}), updateAvatar);

module.exports = routerUsers;
