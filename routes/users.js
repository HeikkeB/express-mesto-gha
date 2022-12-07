const routerUsers = require('express').Router();

const {
  getUser, getAllUsers, updateUser, updateAvatar,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:userId', getUser);
routerUsers.patch('/me', updateUser);
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
