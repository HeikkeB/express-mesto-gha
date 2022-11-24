const User = require('../models/User')

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body
  User.create({name, about, avatar})
  .then((user) => res.status(201).send(user))
  .catch((err) => {

  })
}

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    console.log(err)
  })
}

module.exports.getAllUsers = (req, res) => {
User.find({})
.then((users) => res.send(users))
.catch((err) => {
  console.log(err)
})
}

module.exports.updateUser = (req, res) => {
  const {name, about} =req.body
  User.findByIdAndUpdate(req.user._id, {name, about})
  .then((user) => res.send(user))
  .catch((err) => {
    console.log(err)
  }
  )
}

module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body
  User.findByIdAndUpdate(req.user._id, {avatar})
  .then((user) => res.send(user))
  .catch((err) => {
console.log(err)
  })
}