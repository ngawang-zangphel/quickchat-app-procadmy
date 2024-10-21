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

module.exports = router;