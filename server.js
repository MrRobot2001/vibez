require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./SocketServer');
const {ExpressPeerServer} = require('peer')
const path = require('path');

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    SocketServer(socket)
})

ExpressPeerServer(http,{ path: '/'})

app.use('/',require('./routes/auth'))
app.use('/',require('./routes/user'))
app.use('/',require('./routes/post'))
app.use('/',require('./routes/comment'))
app.use('/',require('./routes/notify'))
app.use('/',require('./routes/message'))  

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser : true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Database connected')
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('vibez-front/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join('vibez-front', 'build', 'index.html'))
    })
}

const port= process.env.PORT || 5000;
http.listen(port, () => {
    console.log('Server is running on port',port)
})