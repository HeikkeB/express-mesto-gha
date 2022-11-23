const router = require('express').Router()

router.get('/users')
router.get('/users/:userId')
router.post('/users', (req, res) => {
  const {name, about, avatar} = req.body
  res.json({name, about, avatar})
})

module.exports = router