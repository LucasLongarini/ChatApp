const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "../client/build")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

let onlineUsers = [];

let messageLength = 200;
let messageIndex = 0;
let messages = [];

io.on('connection', (socket) => {
    // console.log(socket.handshake.query.username);
    let newUser = {username: `User${Date.now()}`, color: '#5F5F5F'};
    onlineUsers.push(newUser);
    socket.emit("login", {
        user: newUser,
        messages: messages,
        users: onlineUsers
    });

    io.emit('new users', onlineUsers);

    socket.on('disconnect', _ => {
        onlineUsers = onlineUsers.filter(e => {
            return e.username != newUser.username;
        });
        io.emit('new users', onlineUsers);
    });

    socket.on("send message", message => {
        var newMessage = {
            message: convertEmoji(message.message),
            user: newUser,
            time: new Date(),
        }
        messages[messageIndex % messageLength] = newMessage;
        messageIndex++;
        io.emit('new messages', messages);
    });
});

// converst ':)' ':(' ':o' to emojis
function convertEmoji(message) {
    message = message.replace(':)', "😁");
    message = message.replace(':(', "🙁");
    message = message.replace(':o', "😲");
    return message;
}

//Errors 
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status(404)
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error.message })
})

server.listen(port, () => {
    console.log("Server Listening on port " + port)
})
module.exports = app;