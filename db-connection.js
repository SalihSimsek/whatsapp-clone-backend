const mongoose = require('mongoose')
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: "eu",
    useTLS: true
});


function main() {
    mongoose.connect(process.env.MONGO_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    const db = mongoose.connection;

    db.once('open', () => {
        console.log('DB Connected')
        const msgCollection = db.collection('messages')
        const changeStream = msgCollection.watch()

        changeStream.on('change', (change) => {
            if (change.operationType == 'insert') {
                const messageDetails = change.fullDocument
                pusher.trigger('messages', 'inserted', {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received : messageDetails.received
                })
            }
            else {
                console.log('Error triggering Pusher')
            }
        })
    })
}

main()