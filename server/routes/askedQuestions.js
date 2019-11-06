require('../model/question')
require('../model/askedQuestion')
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Question = mongoose.model('Question')
const AskedQuestion = mongoose.model('AskedQuestion')

const answersRouter = require('./answers')

router.use('/:questionnumber/answers', (req, res, next) => {
    req.questionNumber = req.params.questionnumber
    next()
}, answersRouter)


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

    req.app.get('wss').broadcast({ type: 'QUESTIONASKED', questionId: req.body.questionId, roundNumber: game.rounds.length, questionNumber: game.rounds[req.roundnumber - 1].questions.length }, game.password, 'teams')

    res.sendStatus(201)
})

router.get('/suggestions', async (req, res) => {
    const game = req.game
    const askedQuestions = game.rounds.map(round => round.questions.id)
    const round = game.rounds[req.roundnumber - 1]
    const questions = await Promise.all(round.categories.map(c => Question.getRandom(c, askedQuestions)))

    res.json({ questions: questions })
})

router.get('/:questionNumber', (req, res) => {
    const game = req.game
    const { question, categorie } = game.rounds[req.roundnumber - 1].questions[questionNumber - 1]

    res.json({
        question: question,
        categorie: categorie
    })
})


router.put('/:questionNumber/close', async (req, res) => {
    const game = req.game
    game.rounds[req.roundnumber - 1].questions[req.params.questionNumber - 1].closed = true

    game.markModified('rounds')
    await game.save()

    req.app.get('wss').broadcast({ type: 'QUESTIONCLOSED' }, game.password, 'teams')

    res.sendStatus(201)
})

router.put('/:questionNumber/next', (req, res) => {
    req.app.get('wss').broadcast({ type: 'NEXTQUESTION' }, req.game.password, 'teams')

    res.sendStatus(201)
})

module.exports = router;