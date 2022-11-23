const User = require('../models/User')

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body
  User.create({name, about, avatar})
  .then((user) => res.send(user))
  .catch((err) => {
    console.log(err)
  })

}