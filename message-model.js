const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received : Boolean
})

const MessageModel = mongoose.model('Message',MessageSchema)

module.exports = MessageModel