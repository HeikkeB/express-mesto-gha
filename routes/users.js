const routerUsers = require('express').Router();

const {
  createUser, getUser, getAllUsers, updateUser, updateAvatar,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:userId', getUser);
routerUsers.post('/', createUser);
routerUsers.patch('/me', updateUser);
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;