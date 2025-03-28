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
            success: true,
            data: savedChat
        });

    }catch (err) {
        res.status(404).send({
            message: err.message,
            success: false
        })
    }
});

//Get Route
router.get('/get-all-chats', authMiddleware, async (req, res) => {
    try {
        //$in: check if current logged in user id
        //Anny chat whose members Id contains userID of the currently logged in user
        //Populate: in the data base we will simply store Ids but in response, we get full user details
        //.sort({updatedAt: -1}): whenever a new message will come for a given chat, that chat will go at the top
        //.populate('lastMessage'), since in chat database, we are simply storing messageId, doing this, we will get its details also.
        const allChats = await Chat.find({members: {$in: req?.body?.userId}}).populate('members').populate('lastMessage').sort({updatedAt: -1});

        res.status(200).send({
            message: "Chat Fetched successfully",
            success: true,
            data: allChats
        });

    }catch (err) {
        res.status(404).send({
            message: err.message,
            success: false
        })
    }
});

module.exports = router;