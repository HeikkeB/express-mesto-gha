const Users = require('../models/User')

module.exports.createUser = (req, res) => {
  try {
    const {name, about, avatar} = req.body
  res.json({name, about, avatar})
  } catch (error) {
    console.log(error)
  }

}