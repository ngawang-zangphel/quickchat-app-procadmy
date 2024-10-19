const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    //store in arry since chat happens between two users
    members: {
        type: [
            {
                //ObjectID of users chatting
                type: mongoose.Schema.Types.ObjectId,
                //from which collection we want to store.
                ref: 'users'
            }
        ]
    },
    //last message sent between this two users.
    lastMessage: {
        //Store Object ID of message colleciton (yet to create)
        type: mongoose.Schema.Types.ObjectId,
        //Another schema to store messages
        ref: 'messages'
    },
    //number of unread messages
    unreadMessageCount: {
        type: Number,
        default: 0
    }
},
//autmatically adds createdAt and updateAt due to this
// whenever new object is created in database
{timestamps: true}
)
//first is collection name and schema model
module.exports =  mongoose.model('chats', chatSchema);