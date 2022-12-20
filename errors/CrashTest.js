const routerCrash = require('express').Router();

routerCrash.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Attention! The server is about to crash');
  }, 2000);
});

module.exports = routerCrash;
