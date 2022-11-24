const User = require('../models/User')

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body
  User.create({name, about, avatar})
  .then((user) => res.send(user))
  .catch((err) => {
    console.log(err)
  })
}

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => res.send(user))
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