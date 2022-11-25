const User = require('../models/user');
const {
  STATUS_CREATED, NOT_FOUND, BAD_REQUEST, SERVER_ERROR,
} = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(STATUS_CREATED).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.send({ data: user });
      else res.status(NOT_FOUND).send({ message: 'User is not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
      }
    });
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
      else res.status(NOT_FOUND).send({ message: 'User is not found' });
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
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
      else res.status(NOT_FOUND).send({ message: 'User is not found' });
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        res.status(BAD_REQUEST).send({ message: 'Incorrect data entered' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Internal error has occurred' });
      }
    });
};
