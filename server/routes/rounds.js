require('../model/game')
const express = require('express')
const roleAuthentication = require('../middleware/roleAuthentication')
const router = express.Router()

const askedQuestionsRouter = require('./askedQuestions')

router.use('/:roundnumber', (req, res, next) => {
    const game = req.game;

    req.roundnumber = req.params.roundnumber
    req.game.rounds[req.roundnumber - 1] ? next() : next({ code: 'RESNOTFOUND' })
})

router.use('/:roundnumber/askedquestions', askedQuestionsRouter)

router.use(roleAuthentication.roleAuthentication('quizmaster'))

router.put('/:roundnumber/categories', async (req, res) => {
    const game = req.game

    game.rounds[req.roundnumber - 1].categories = req.body.categories
    game.markModified('rounds')
    await game.save()

    req.app.get('wss').broadcast({ type: 'STARTROUND' }, req.game.password, 'quizmaster', 'teams')

    res.sendStatus(200)
})

router.post('/', (req, res) => {
    req.game.startNewRound()
    res.sendStatus(200)
})

router.put('/:roundnumber/close', async (req, res) => {
    const game = req.game
    await game.closeRound(req.roundnumber)

    req.app.get('wss').broadcast({ type: 'ROUNDCLOSED' }, game.password, 'teams', 'scoreboard')

    res.sendStatus(200)
})

module.exports = router;