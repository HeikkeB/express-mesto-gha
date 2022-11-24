const User = require('../models/User');

const { CREATED, OK } =require('../errors/errors')
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const ServerError = require('../errors/serverError');

module.exports.createUser = (req, res, next) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
  .then((user) => res.status(CREATED).send(user))
  .catch((err) => {
    if(err.name === 'CastError') {
       next(new BadRequest('Incorrect data entered'));
       return;
    } else {
       next(new ServerError('An internal error has occurred'));
       return;
    }
  })
}

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
  .then((user) => res.status(OK).send(user))
  .catch((err) => {
if(err.name === 'CastError') {
  next(new BadRequest('Incorrect data entered'));
  return;
  } else if(err.name === 'CastError') {
  next(new NotFound(`User isn't found`));
  return;
  } else {
  next(new ServerError('An internal error has occurred'));
  return;
  }
 })
}

module.exports.getAllUsers = (req, res, next) => {
User.find({})
.then((users) => res.status(OK).send(users))
.catch((err) => {
  if(err.name === 'CastError') {
    next(new BadRequest('Incorrect data entered'));
    return;
    } else {
    next(new ServerError('An internal error has occurred'));
    return;
    }
})
}

module.exports.updateUser = (req, res, next) => {
  const {name, about} =req.body
  User.findByIdAndUpdate(req.user._id, {name, about})
  .then((user) => res.status(OK).send(user))
  .catch((err) => {
    if(err.name === 'CastError') {
      next(new BadRequest('Incorrect data entered'));
      return;
      } else if(err.name === 'NotFound') {
      next(new NotFound(`User isn't found`));
      return;
      } else {
      next(new ServerError('An internal error has occurred'));
      return;
      }
  }
  )
}

module.exports.updateAvatar = (req, res, next) => {
  const {avatar} = req.body
  User.findByIdAndUpdate(req.user._id, {avatar})
  .then((user) => res.status(OK).send(user))
  .catch((err) => {
    if(err.name === 'CastError') {
      next(new BadRequest('Incorrect data entered'));
      return;
      } else if(err.name === 'NotFound') {
      next(new NotFound(`User isn't found`));
      return;
      } else {
      next(new ServerError('An internal error has occurred'));
      return;
      }
  })
}