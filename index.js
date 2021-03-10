const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const Message = require('./message-model')

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin',"*")
    res.setHeader('Access-Control-Allow-Headers',"*")
    next()
})

require('./db-connection')



app.get('/message/sync', async (req, res) => {
    const messages = await Message.find()
    res.status(200).send(messages)
})

app.post('/message/new', async (req, res) => {
    const message = req.body
    const newMessage = await Message.create(message)
    res.status(200).send(newMessage)
})

app.listen(3001, () => {
    console.log('Listening')
})