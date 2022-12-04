const router = require('express').Router();
const routerUsers = require('./users');
const routerCards = require('./cards');

router.use('/users', routerUsers);
router.use('/cards', routerCards);

module.exports = router;
