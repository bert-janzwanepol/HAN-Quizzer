// NPM modules
var express = require('express')
var http = require('http')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')

// Self-build modules
var wssFactory = require('./socketserver')
var indexRouter = require('./routes')
var gamesRouter = require('./routes/games')
var questionsRouter = require('./routes/questions')
var categoriesRouter = require('./routes/categories')
var quizmastersRouter = require('./routes/quizmasters')

// Http server definition
var server = http.createServer()

// Express setup
var app = express()

app.use(logger(':method | \':url\' | :status | :res[content-length] - :response-time ms'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/static', express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', indexRouter)
app.use('/games', gamesRouter)
app.use('/questions', questionsRouter)
app.use('/categories', categoriesRouter)
app.use('/quizmaster', quizmastersRouter)


// WSS setup
wssFactory.createServer(server)
//server.on('upgrade', () => :TODO zorg ervoor dat de server weet wat voorn socket het is)

// Http settings
server.on('request', app);
server.on('upgrade', (req, socket, head) => {
    socket.id = 1
})

server.listen(3000,
    function () {
        console.log("The Server is lisening on port 3000.")
    });