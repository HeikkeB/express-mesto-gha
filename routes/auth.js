const routerAuth = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const { login, createUser } = require('../controllers/users');

const method = (value) => {
    let result = validator.isURL(value); 
    if(result) {
      return value;
    } else {
      throw new Error('URL validation err');
    }
  };
  

routerAuth.post('/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string(),custom(method),
      email: Joi.string().required().email().pattern(/^\S+@\S+\.\S+$/),
      password: Joi.string().required().min(4),
    }),
  }), createUser);
