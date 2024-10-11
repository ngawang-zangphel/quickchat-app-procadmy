const mongoose = require('mongoose');

//Connect to MongoDB Database
mongoose.connect(process.env.CONN_STRING);

const db = mongoose.connection;

//to listen if DB connection is successful
db.on('connected', () => {
    console.log('DB Connection established')
});

//if connection fails
db.on('err', ()=> {
    console.log('DB Connection Failed');
})

module.exports = db;