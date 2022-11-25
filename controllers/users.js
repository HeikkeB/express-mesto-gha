const User = require('../models/User');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.status(200).send({ data: user });
      else res.status(404).send({ message: 'User is not found' });
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (user) res.status(200).send({ name, about });
      else res.status(404).send({ message: 'User is not found' });
    })
    .catch((err) => {
      if ((err.name === 'ValidationError')) {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (user) res.status(200).send({ avatar });
      else res.status(404).send({ message: 'User is not found' });
    })
    .catch((err) => {
      if ((err.name === 'ValidationError')) {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
      }
    });
};