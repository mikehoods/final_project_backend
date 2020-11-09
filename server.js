///////////DEPENDENCIES///////////

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config();

///////////GLOBALS///////////

const PORT = process.env.PORT || 3000
const entriesController = require('./controllers/entries.js')

///////////DATABASE CONNECT///////////
mongoose.connect('mongodb+srv://heroku_r5krpc15:diary@dear-diary.r6aqw.mongodb.net/heroku_r5krpc15?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true }
)
.then(()=> console.log('Connected to MongoDB Atlas'))
.catch(err => console.log('Error: ', err.message));


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