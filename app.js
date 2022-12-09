const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const routerAuth = require('./routes/auth');
const router = require('./routes/index');
const { notFoundError } = require('./utils/notFoundError');
const { limiter } = require('./middlewares/limiter');
const auth = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

app.use(helmet());
app.use(limiter);
app.use(routerAuth);
app.use(auth, router);
app.use('*', notFoundError);
app.use(errors());
app.use(handleErrors);

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
