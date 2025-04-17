const express = require('express')
const app = express();
const authRouter = require('./controllers/authController');
const userRouter = require('./controllers/userController');
const chatRouter = require('./controllers/chatController');
const messageRouter = require('./controllers/messageController');

app.use(express.json());

//http is a built in package
const server = require('http').createServer(app);

//returns a function. and will call it
// Parameters:
// 1st param: pass that server
//2nd param: options:
/*
    {  
        cors: {
            //accept those coming from
            origin: 'http://localhost:3000',
            //accept these methods
            methods: ['GET', 'POST']
        }
    }
*/
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:4500',
        methods: ['GET', 'POST']
    }
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

// TEST SOCKET CONNECTION FROM CLIENT
io.on('connection', socket => {
    socket.on('join-room', userid => { socket.join(userid); });

    socket.on('send-message', (message) => {
        io.to(message.members[0]).to(message.members[1]).emit('receive-message', message)
    });

    socket.on('clear-unread-messages', (data) => {
        io.to(data.members[0])
        .to(data.members[1])
        .emit('message-count-cleared', data)
    });

    socket.on('user-typing', (data) => {
        io.to(data.members[0])
        .to(data.members[1])
        .emit('started-typing', data)
    })
}) 

module.exports = server;