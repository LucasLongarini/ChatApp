const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

const chatRoutes = require('./api/routes/chat')

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server Listening on port " + port)
})

app.get('/', (req, res) => {
    res.status(200).json({ response: "Root" })
})

app.use(`/${chatRoutes.RouteName}`, chatRoutes)

//Errors 
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status(404)
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({ error: error.message })
})

module.exports = app;