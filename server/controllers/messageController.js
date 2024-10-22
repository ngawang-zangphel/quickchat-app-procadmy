const router = require('express').Router();
const authMiddleware = require('./../middlewares/authMiddleware');
const Chat = require('./../models/chat');
const Message = require('./../models/message');

router.post('/new-message', authMiddleware, async (req, res) => {
    try {
        //Store the message in message collection (data base)
        const newMessage = new Message(req.body);
            //to save in database
        const savedMessage = await newMessage.save();
        //update the last messgae in chat collection

        /*
        // method 1
            //find the chat by id.
        const currentChat = await Chat.findById(req.body.chatId);
            //set the last message using message id
        currentChat.lastMessage = savedMessage._id;
        //Save() => to save changes to database.
        await currentChat.save();
        */
       //another method 2
       //findOneAndUdpate:
       const currentChat = await Chat.findOneAndUpdate(
        { // find document using _id (from req body)
        _id: req.body.chatId},
        {
            //what to update with
            lastMessage: savedMessage._id,
            //increment the value of unread message count
            // $inc: increment the value of unreadMessageCount by 1
            $inc: {
                //whose value we want to increament: by how much
                unreadMessageCount: 1
            },
        });

        res.status(201).send({
            message: "Message sent successfully",
            success: true,
            data: savedMessage
        })
    } catch (err) {
        res.status(400).send({
            message: err.message,
            success: false
        })
    }
});


module.exports = router;