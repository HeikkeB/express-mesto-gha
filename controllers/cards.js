const Card = require('../models/Card');

const { CREATED, OK } = require('../errors/errors');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const ServerError = require('../errors/serverError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Incorrect data entered'));
      } else {
        next(new ServerError('Internal error has occurred'));
      }
    });
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK).send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Incorrect data entered'));
      } else if (err.name === 'NotFound') {
        next(new NotFound('Card is not found'));
      } else {
        next(new ServerError('Internal error has occurred'));
      }
    });
};

module.exports.removeCard = (req, res, next) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .then(() => res.status(OK).send({ message: 'Card deleted' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Incorrect data entered'));
      } else if (err.name === 'NotFound') {
        next(new NotFound('Card is not found'));
      } else {
        next(new ServerError('Internal error has occurred'));
      }
    });
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Incorrect data entered'));
      } else {
        next(new ServerError('Internal error has occurred'));
      }
    });
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Incorrect data entered'));
      } else if (err.name === 'NotFound') {
        next(new NotFound('Like is not found'));
      } else {
        next(new ServerError('Internal error has occurred'));
      }
    });
};