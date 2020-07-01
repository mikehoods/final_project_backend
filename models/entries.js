const {Schema, model} = require('mongoose')

const entrySchema = new Schema({
    title: String,
    body: String,
    tag: [[String]],
    img: String,
    username: String,
}, {timestamps: true}
)

const Entry = model('entry', entrySchema)

module.exports = Entry