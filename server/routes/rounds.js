var express = require('express')
var router = express.Router()

var questionsRouter = require('./askedQuestions')

router.use('/questions', questionsRouter)

module.exports = router;