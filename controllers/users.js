/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const Unauthorized = require('../errors/Unauthorized');
const NotFoundError = require('../errors/NotFoundError');

const {
  STATUS_CREATED,
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  SERVER_ERROR_MESSAGE,
  NOT_FOUND_MESSAGE,
} = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(STATUS_CREATED).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data entered'));
      } else if (err.code === 11000) {
        next(new ConflictError('This email is already in use'));
      } else {
        next(err);
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

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'fc940a6da342577ec7ecc725c90a5037', {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, { expires: new Date(Date.now() + 12 * 3600000), httpOnly: true, sameSite: true });
      res.send({ message: 'Authorization was successful!', token });
    })
    .catch((err) => {
      if (err.message === 'IncorrectEmail') {
        return next(new Unauthorized('Wrong email or password!'));
      }
      next(err);
    });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user._id) {
        next(new NotFoundError('User not found'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Incorrect data entered'));
      } else {
        next(err);
      }
    });
};
