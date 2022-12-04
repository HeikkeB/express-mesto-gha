/* eslint-disable import/no-unresolved */
const Card = require('../models/card');

const {
  STATUS_CREATED,
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
  DELETE_ITEM,
} = require('../utils/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .then((card) => {
      if (card) res.send({ message: DELETE_ITEM });
      else res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) res.send({ data: card });
      else res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};
