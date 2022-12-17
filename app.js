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
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

// protection
app.use(helmet());
app.use(limiter);

// requests logger
app.use(requestLogger);

// routes
app.use(routerAuth);
app.use(auth, router);
app.use('*', notFoundError);

// errors logger
app.use(errorLogger);

// errors validation
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
