const routerUsers = require('express').Router();
const {
  getUser, getAllUsers, updateUser, updateAvatar, getUserMe,
} = require('../controllers/users');

routerUsers.get('/', getAllUsers);
routerUsers.get('/:userId', getUser);
routerUsers.get('/me', getUserMe);
routerUsers.patch('/me', updateUser);
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
