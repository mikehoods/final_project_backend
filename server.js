///////////DEPENDENCIES///////////

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/users.js')
const bcrypt = require('bcyrpt')
const jwt = require('jsonwebtoken')

require('dotenv').config();

///////////GLOBALS///////////

const PORT = process.env.PORT || 3000
const entriesController = require('./controllers/restaurants.js')
const usersController = require('./controllers/users/js')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

const user = {username: 'user', password: 'pass'}

const whitelist = [
    'http:localhost:1982'
]

///Configure CORS middleware///

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf (origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

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
    res.redirect('/entires')
})

///////////LISTENER///////////
app.listen(PORT, ()=> {
    console.log('I hear you Port: ${PORT}')
})