const routerCards = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const {
  getAllCards, createCard, removeCard, addLike, removeLike,
} = require('../controllers/cards');

const method = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

routerCards.get('/', getAllCards);
routerCards.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(method),
  }),
}), createCard);
routerCards.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), removeCard);
routerCards.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), addLike);
routerCards.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), removeLike);

module.exports = routerCards;
