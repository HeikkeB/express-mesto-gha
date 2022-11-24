const routerUsers = require('express').Router()

const {createUser, getUser, getAllUsers} = require('../controllers/users')


routerUsers.get('/', getAllUsers)
routerUsers.get('/:userId', getUser)
routerUsers.post('/', createUser)

module.exports = routerUsers