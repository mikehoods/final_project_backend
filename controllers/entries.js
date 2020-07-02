///////////DEPENDENCIES///////////

const express = require('express')
const router = express.Router()
const Entry = require('../models/entries.js')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({msg: "No token"})
        }
    token = token.split(' ')[1]
    const verified = jwt.verify(token, process.env.jwtSECRET)
    if (!verified) {
        return res.status(401).json({msg: "Not verified"})
    }
    req.user = verified
    next();
    }
    catch (error) {
        res.status(500).json({error: error.message})
    }
}

///////////ROUTES///////////

////Create Route:

router.post('/', async (req, res) => {
    try {
        const newEntry = {...req.body, username: req.user.username}
        const createdEntry = await Entry.create(newEntry)
        res.status(200).json(createdEntry)
    } catch(error) {
        res.status(400).json(error)
    }
})

////Read Route:

router.get('/', async (req, res) => {
    try {
        const entries = await Entry.find({username: req.user.username})
        res.status(200).json(entries)
    } catch(error) {
        res.status(400).json(error)
    }
})

////Delete Route: 

router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await Entry.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedEntry)
    } catch(error) {
        res.status(400).json(error)
    }
})

////Update Route:

router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            req.body
        )
        res.status(200).json(updatedEntry)
    } catch(error) {
        res.status(400).json(error)
    }
})

module.exports = router