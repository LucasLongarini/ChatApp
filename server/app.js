const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, "../client/build")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
})

let onlineUsers = [];

io.on('connection', (socket) => {
    socket.emit("login", socket.id);
    onlineUsers.push(socket.id);
    console.log(onlineUsers);

    socket.on('disconnect', _ => {
        const index = onlineUsers.indexOf(socket.id);
        if (index > -1) {
            onlineUsers.splice(index, 1);
        }
        console.log(onlineUsers);
    });

    socket.on("new message", message => {

    });
});

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