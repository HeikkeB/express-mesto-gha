const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { notFoundError } = require('./utils/notFoundError');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth, router);
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
