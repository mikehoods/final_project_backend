///////////DEPENDENCIES///////////

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")

require('dotenv').config();

///////////GLOBALS///////////

const PORT = process.env.PORT || 3000
const entriesController = require('./controllers/entries.js')
const db = mongoose.connection
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'

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
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/entries/', entriesController)

///Reroute to /entries
app.get('/', (req, res) => {
    res.redirect('/entries')
})

///////////LISTENER///////////
app.listen(PORT, ()=> {
    console.log(`I hear you Port: ${PORT}`)
})