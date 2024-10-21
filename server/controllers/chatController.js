const router = require('express').Router();
const Chat = require('./../models/chat');
const authMiddleware = require('./../middlewares/authMiddleware')

//Post route
router.post('/create-new-chat', authMiddleware, async (req, res) => {
    try {
        //To Start a new Chat, you need ID of the two users.
        const chat = new Chat(req.body);
        const savedChat = await chat.save();

        res.status(201).send({
            message: "Chat created successfully",
            succcess: true,
            data: savedChat
        });

    }catch (err) {
        res.status(404).send({
            message: err.message,
            succcess: false
        })
    }
});

//Get Route
router.get('/get-all-chats', authMiddleware, async (req, res) => {
    try {
        //$in: check if current logged in user id
        //Anny chat whose members Id contains userID of the currently logged in user
        const allChats = await Chat.find({members: {$in: req?.body?.userId}});

        res.status(200).send({
            message: "Chat Fetched successfully",
            succcess: true,
            data: allChats
        });

    }catch (err) {
        res.status(404).send({
            message: err.message,
            succcess: false
        })
    }
});

module.exports = router;