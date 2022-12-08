const routerUsers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, getAllUsers, updateUser, updateAvatar, getUserMe,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/me', getUserMe);
routerUsers.get('/:userId', getUser);
routerUsers.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
