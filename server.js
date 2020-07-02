///////////DEPENDENCIES///////////

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/users.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config();

///////////GLOBALS///////////

const PORT = process.env.PORT || 3000
const entriesController = require('./controllers/entries.js')
const usersController = require('./controllers/users.js')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

///////////DATABASE CONNECT///////////

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
db.on('open', ()=> {
    console.log('Connected to Mongo')
})

///////////MIDDLEWARE///////////

app.use(cors())
app.use(express.json())
app.use('/entries/', entriesController)
app.use('/users/', usersController)

///Reroute to /entries
app.get('/', (req, res) => {
    res.redirect('/entries')
})

///////////LISTENER///////////
app.listen(PORT, ()=> {
    console.log(`I hear you Port: ${PORT}`)
})