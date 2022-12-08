/* eslint-disable no-unused-vars */
module.exports.handleErrors = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'Internal error has occurred' : message });
});
