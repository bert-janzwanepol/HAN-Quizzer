require('../model/game')
const express = require('express')
const router = express.Router()

const questionsRouter = require('./questions')

router.use('/:roundnumber/questions', (req, res, next) => {
    req.roundnumber = req.params.roundnumber
    next()
}, questionsRouter)

router.put('/:roundnumber/categories', async (req, res) => {
    const game = req.game

    game.rounds[req.params.roundnumber - 1].categories = req.body.categories
    game.markModified('rounds')
    game.save()

    res.sendStatus(200)
})

router.post('/:roundnumber/start', (req, res) => {
    req.app.get('wss').broadcast({ type: 'STARTROUND' }, game.password, 'quizmaster', 'teams')
    res.sendStatus(200)
})

router.put('/:roundnumber/close', (req, res) => {
    req.app.get('wss').broadcast({ type: 'ROUNDCLOSED' }, game.password, 'teams')

    res.sendStatus(200)
})

module.exports = router;