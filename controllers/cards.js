const Card = require('../models/card');
const {
  STATUS_CREATED, NOT_FOUND, BAD_REQUEST, SERVER_ERROR,
} = require('../utils/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .then((card) => {
      if (card) res.send({ message: 'Card deleted' });
      else res.status(NOT_FOUND).send({ message: 'Card is not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(NOT_FOUND).send({ message: 'Like is not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(NOT_FOUND).send({ message: 'Like is not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
      }
    });
};
