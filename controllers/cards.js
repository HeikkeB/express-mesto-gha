const Card = require('../models/Card')

module.exports.createCard = (req, res) => {
const {name, link} = req.body
Card.create({name, link, owner: req.user._id})
.then((card) => res.send({data: card}))
.catch((err) => {
  console.log(err)
})
}

module.exports.getAllCards = (req, res) => {
  Card.find({})
  .then((cards) => res.send(cards))
  .catch((err) => {
    console.log(err)
  })
}

module.exports.removeCard = (req, res) => {
  Card.findByIdAndDelete({_id: req.params.cardId})
  .then(() => res.send({message: 'Card deleted'}))
  .catch((err) => {
    console.log(err)
  })
}

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
    )
    .then((card) => res.send({data: card}))
    .catch((err) => {
      console.log(err)
    })
}

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
  { new: true },
    )
    .then((card) => res.send({data: card}))
    .catch((err) => {
      console.log(err)
    })
}