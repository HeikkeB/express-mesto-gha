const routerCards = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getAllCards, createCard, removeCard, addLike, removeLike,
} = require('../controllers/cards');

routerCards.get('/', getAllCards);
routerCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);
routerCards.delete('/:cardId', removeCard);
routerCards.put('/:cardId/likes', addLike);
routerCards.delete('/:cardId/likes', removeLike);

module.exports = routerCards;
