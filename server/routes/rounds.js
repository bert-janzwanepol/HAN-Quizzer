const express = require('express')
const router = express.Router()

const questionsRouter = require('./askedQuestions')

router.use('/questions', questionsRouter)

module.exports = router;