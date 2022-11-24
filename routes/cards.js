const routerCards = require('express').Router()

const {getAllCards, createCard, removeCard} = require('../controllers/cards')

routerCards.get('/', getAllCards)
routerCards.post('/', createCard)
routerCards.delete('/:cardId', removeCard)

module.exports = routerCards