const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routerUsers = require('./routes/users')

const PORT = process.env.PORT || 3000

const app = express()
dotenv.config()

app.use(express.json())

app.use('/users', routerUsers)

async function start() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb')

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
  })
  } catch (error) {
    console.log(error)
  }
}

start()


// {
//   "_id": {
//     "$oid": "637e73ef6ced3ba1c94bef65"
//   },
//   "name": "qqq",
//   "about": "ttt",
//   "avatar": "fff.com",
//   "__v": 0
// }