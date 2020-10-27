const express = require('express')
const app = require('../../app')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({response: "chat"})
});

io.on('connection', () => {
    console.log('connected to socket');
});

module.exports = router;
module.exports.RouteName = "chat"