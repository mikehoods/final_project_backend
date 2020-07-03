///////////DEPENDENCIES///////////

const express = require('express')
const router = express.Router()
const Entry = require('../models/entries.js')
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")

// Set up Auth0 configuration 
const authConfig = {
    domain: "dev-n0wp5j87.us.auth0.com",
    audience: "https://vue-express-api.com"
  };

const checkJwt = jwt({
    // Provide a signing key based on the key identifier in the header and the signing keys provided by your Auth0 JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),
  
    // Validate the audience (Identifier) and the issuer (Domain).
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ["RS256"]
  });

///////////ROUTES///////////

////Create Route:

router.post('/', async (req, res) => {
    try {
        console.log("michael")
        console.log(req.body.post)
        const createdEntry = Entry.create(req.body.post)
        res.status(200).json(createdEntry)
    } catch(error) {
        res.status(400).json(error)
    }
})

// router.post('/', (req, res) => {
//     console.log(req.body);
//     Entry.create(req.body).then((createdEntry) => {
//         res.json(createdEntry);
//     }).catch((error) => {
//         res.status(500);
//         res.json(error);
//     });
// });

////Read Route:

router.get('/', async (req, res) => {
    try {
        // console.log(req.user.username)
        const entries = Entry.find({}, (errors, entries)=> {
            res.status(200).json(entries)
        })
    } catch(error) {
        res.status(400).json(error)
    }
})

////Show Route:

router.get('/entries/:id', checkJwt, (req, res) => {
    const id = Number(req.params.id);
    const entry = entries.find(entry => entry.id === id);
    res.send(entry);
  });

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