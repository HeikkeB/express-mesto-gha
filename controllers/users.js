/* eslint-disable import/no-unresolved */
const User = require('../models/user');
const {
  STATUS_CREATED,
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.send({ data: user });
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

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) res.send({ name, about });
      else res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE });
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) res.send({ avatar });
      else res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE });
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      } else {
        res.status(SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE });
      }
    });
};
