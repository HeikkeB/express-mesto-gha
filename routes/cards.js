const routerCards = require('express').Router();

const {
  getAllCards, createCard, removeCard, addLike, removeLike,
} = require('../controllers/cards');

routerCards.get('/', getAllCards);
routerCards.post('/', createCard);
routerCards.delete('/:cardId', removeCard);
routerCards.put('/:cardId/likes', addLike);
routerCards.delete('/:cardId/likes', removeLike);

module.exports = routerCards;
