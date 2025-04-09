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
    //listen to an event using on method
    //event name, evtnt data
    socket.on('send-message-all', data => {
        console.log(data);
        //data.text since data received from client is { text: 'Hi from User' }
        socket.emit('send-message-by-server', "Message from server: " + data.text);

    });
}) 

module.exports = server;