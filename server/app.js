// NPM modules
const express = require('express')
const http = require('http')
const path = require('path')
const cors = require('cors')
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

// added to make request from different origin (port) work
app.use(cors({ origin: true, credentials: true }));
app.options("*", cors({ origin: true, credentials: true }));

app.use(authentication.authentication().unless({
    path: [
        '/quizmaster/login',
        { url: /\/games\/[a-z]{5}\/teams/, methods: ['POST'] }
    ]
}))
app.use(errorHandler.errorHandler())

// Routes
app.use('/games', gamesRouter)
app.use('/questions', questionsRouter)
app.use('/categories', categoriesRouter)
app.use('/quizmaster', quizmastersRouter)
app.use('/', indexRouter)

app.use('/static', express.static(path.join(__dirname, 'public')))


// WSS setup
const wss = wssFactory.createServer(server)
app.set('wss', wss)

// Http settings
server.on('request', app);

// Mongoose settings
server.listen(3000, () => {
    mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log(`game server started on port ${server.address().port}`);
    });
});