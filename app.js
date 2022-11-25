const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const PORT = process.env.PORT || 3000;

const app = express();
dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '637f712f21ee222104b6363d',
  };
  next();
});

app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Not found' });
});

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