const routerUsers = require('express').Router()

const {createUser} = require('../controllers/users')


routerUsers.get('/users')
routerUsers.get('/users/:userId')
routerUsers.post('/', createUser)

module.exports = routerUsers