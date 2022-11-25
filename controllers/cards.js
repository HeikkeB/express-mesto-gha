const Card = require('../models/Card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
      }
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndDelete({ _id: req.params.cardId })
    .then((card) => {
      if (card) res.status(200).send({ message: 'Card deleted' });
      else res.status(404).send({ message: 'Card is not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
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
      if (card) res.status(200).send({ data: card });
      else res.status(404).send({ message: 'Like is not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
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
      if (card) res.status(200).send({ data: card });
      else res.status(404).send({ message: 'Like is not found' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Incorrect data entered' });
      } else {
        res.status(500).send({ message: 'Internal error has occurred' });
      }
    });
};