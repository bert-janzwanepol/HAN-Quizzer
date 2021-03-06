require('../model/question')
require('../model/askedQuestion')
const express = require('express');
const mongoose = require('mongoose')
const roleAuthentication = require('../middleware/roleAuthentication')
const router = express.Router();

const Question = mongoose.model('Question')
const AskedQuestion = mongoose.model('AskedQuestion')

const answersRouter = require('./answers')

router.get('/suggestions', async (req, res) => {
    const game = req.game
    const askedQuestions = game.rounds.map(round => round.questions.id)
    const round = game.rounds[req.roundnumber - 1]
    const questions = await Promise.all(round.categories.map(c => Question.getRandom(c, askedQuestions)))

    res.json({ questions: questions })
})

router.use('/:questionnumber', (req, res, next) => {
    req.questionNumber = req.params.questionnumber
    req.game.rounds[req.roundnumber - 1].questions[req.questionNumber - 1] ? next() : next({ code: 'RESNOTFOUND' })
})

router.use('/:questionnumber/answers', answersRouter)


router.get('/:questionNumber', (req, res) => {
    const game = req.game
    const { question, categorie } = game.rounds[req.roundnumber - 1].questions[req.questionNumber - 1]

    res.json({
        question: question,
        categorie: categorie
    })
})

router.use(roleAuthentication.roleAuthentication('quizmaster'))

router.post('/', async (req, res) => {
    const game = req.game
    const askedQuestion = new AskedQuestion({
        questionId: req.body.questionId,
        answers: [],
        closed: false
    })

    game.rounds[req.roundnumber - 1].questions.push(askedQuestion)
    game.markModified('rounds')
    await game.save()

    req.app.get('wss').broadcast({ type: 'QUESTIONASKED', questionId: req.body.questionId }, game.password, 'teams', 'scoreboard')
    res.sendStatus(201)
})

router.put('/:questionNumber/close', async (req, res) => {
    const game = req.game
    game.rounds[req.roundnumber - 1].questions[req.params.questionNumber - 1].closed = true

    game.markModified('rounds')
    await game.save()

    req.app.get('wss').broadcast({ type: 'QUESTIONCLOSED' }, game.password, 'teams', 'scoreboard')
    res.sendStatus(201)
})

router.put('/:questionNumber/next', (req, res) => {
    req.app.get('wss').broadcast({ type: 'NEXTQUESTION' }, req.game.password, 'teams')
    res.sendStatus(201)
})

module.exports = router;