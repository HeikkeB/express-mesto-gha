const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { notFoundError } = require('./utils/notFoundError');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '637f712f21ee222104b6363d',
  };
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(router);
app.use('*', notFoundError);

async function start() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
