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

let takenUsers = [];
let onlineUsers = [];

let messageLength = 200;
let messageIndex = 0;
let messages = [];

io.on('connection', (socket) => {
    let existingUser = checkUserExists(socket.handshake.headers.cookie);
    
    let newUser;
    let isNewUser = false;

    // is already an existing user
    if (existingUser !== undefined) {
        newUser = existingUser;
        isNewUser = false;
    }

    // is a brand new user
    else {
        newUser = {username: `User${Date.now()}`, color: '#5F5F5F'};
        takenUsers.push(newUser);
        isNewUser = true;
    }

    onlineUsers.push(newUser);
    socket.emit("login", {
        user: newUser,
        messages: messages,
        users: onlineUsers,
        newUsername: isNewUser
    });

    io.emit('new users', onlineUsers);

    socket.on('disconnect', _ => {
        onlineUsers = onlineUsers.filter(e => {
            return e.username != newUser.username;
        });
        io.emit('new users', onlineUsers);
    });

    socket.on("send message", message => {
        if (message.message.startsWith("/color ")) {
            let color = message.message.replace("/color ", "");
            let re = /[0-9A-Fa-f]{6}/g;

            if(re.test(color)) {
                updateUserColor(newUser.username, color)
            }
            else {
                socket.emit('error message', "Error: Invalid color format");
            }
            re.lastIndex = 0;
        }

        else if (message.message.startsWith("/user ")) {
            let newUsername = message.message.replace("/user ", "");
            
            let existingUsers = takenUsers.filter(user => user.username === newUsername);
            if (existingUsers.length > 0) {
                socket.emit('error message', `Error: Username \"${newUsername}\" is taken`);
            }

            else {
                let oldUsername = newUser.username;
                takenUsers.forEach(user => {
                    if (user.username === oldUsername) {
                        user.username === newUsername;
                        newUser.username = newUsername;
                    }
                });
                socket.emit('new username', newUsername);

                onlineUsers.forEach(user => {
                    if (user.username === oldUsername) {
                        user.username = newUsername;
                    }
                });
                io.emit('new users', onlineUsers);

                messages.forEach(message => {
                    if (message.user.username === oldUsername) {
                        message.user.username = newUsername;
                    }
                });
                io.emit('new messages', messages);

            }

        }

        else if (message.message.startsWith("/")) {
            socket.emit('error message', "Error: Invalid command");
        }

        else {
            var newMessage = {
                message: convertEmoji(message.message),
                user: newUser,
                time: new Date(),
            }
            messages[messageIndex % messageLength] = newMessage;
            messageIndex++;
            io.emit('new messages', messages);
        }
    });
});

function checkUserExists(cookie) {
    if (cookie === undefined || cookie === null) {
        return undefined;
    }

    let allCookies = cookie.split('; ');
    if (allCookies.length <= 0) {
        return undefined;
    }
    
    let usernameCookie = allCookies.find(row => row.startsWith('username='));

    if (usernameCookie != undefined) {
        let username = usernameCookie.split('=')[1];

        let existingUser = takenUsers.filter(user => user.username === username);
        if (existingUser.length > 0) {
            return existingUser[0];
        }
    }

    return undefined;
}

function updateUserColor(username, newColor) {
    onlineUsers.forEach(user => {
        if (user.username === username) {
            user.color = `#${newColor}`;
        }
    });

    takenUsers.forEach(user => {
        if (user.username === username) {
            user.color = `#${newColor}`;
        }
    });

    messages.forEach(message => {
        if (message.user.username === username) {
            message.user.color === `#${newColor}`;
        }
    });

    io.emit('new users', onlineUsers);
    io.emit('new messages', messages);
}

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