const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const PORT = process.env.PORT || 3000

const app = express()
dotenv.config()

async function start() {
  try {
    await mongoose.connect(/*`mongodb+srv://admin:12345@mestodb.grolxo6.mongodb.net/?retryWrites=true&w=majority`*/'mongodb://localhost:27017/mestodb')

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
  })
  } catch (error) {
    console.log(error)
  }
}

start()
