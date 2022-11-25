const STATUS_CREATED = 201;
const NOT_FOUND = 404;
const BAD_REQUEST = 400;
const SERVER_ERROR = 500;
const badRequestMessage = 'Incorrect data entered';
const serverErrorMessage = 'Internal error has occurred';
const notFoundMessage = 'Not found';
const deleteItem = 'Deleted';

const notFound = (req, res) => {
  res.status(404).send({ message: notFoundMessage });
};

module.exports = {
  notFound,
  STATUS_CREATED,
  NOT_FOUND,
  BAD_REQUEST,
  SERVER_ERROR,
  badRequestMessage,
  serverErrorMessage,
  notFoundMessage,
  deleteItem,
};
