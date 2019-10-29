// NPM modules
const express = require('express')
const http = require('http')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

// Self-build modules
const wssFactory = require('./socketserver')

const indexRouter = require('./routes')
const gamesRouter = require('./routes/games')
const questionsRouter = require('./routes/questions')
const categoriesRouter = require('./routes/categories')
const quizmastersRouter = require('./routes/quizmasters')

const errorHandler = require('./middleware/errorHandler')
const authentication = require('./middleware/authentication')

// Http server definition
const server = http.createServer()

// Express setup
const app = express()

app.use(logger(':method | \':url\' | :status | :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(authentication.authentication())
app.use(errorHandler.errorHandler())

// Routes
app.use('/', indexRouter)
app.use('/games', gamesRouter)
app.use('/questions', questionsRouter)
app.use('/categories', categoriesRouter)
app.use('/quizmaster', quizmastersRouter)

app.use('/static', express.static(path.join(__dirname, 'public')))


// WSS setup
wssFactory.createServer(server)
//server.on('upgrade', () => :TODO zorg ervoor dat de server weet wat voorn socket het is)

// Http settings
server.on('request', app);
server.on('upgrade', (req, socket, head) => {
    socket.id = 1
})

// Mongoose settings
const dbName = 'quizzer'

server.listen(3000, () => {
    mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log(`game server started on port ${server.address().port}`);
    });
});