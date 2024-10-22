const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        // TODO: Each chat will have some messages and for each message,
        //we will create a document in the messages collection.
        //we want to relate that message with a given chat.
        //since that message should be a part of given chat.
        type: mongoose.Schema.Types.ObjectId,
        //Collection
        ref: 'chats'
    },
    //Message Sender
    sender: {
        //Store userId of the sender
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users'
    },
    //Message Sent
    text: {
        type: String,
        //When sending, message should be present
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('messages', messageSchema);