require('../model/game')
const express = require('express')
const roleAuthentication = require('../middleware/roleAuthentication')
const router = express.Router()

const askedQuestionsRouter = require('./askedQuestions')

router.use('/:roundnumber', (req, res, next) => {
    const game = req.game;

    req.roundnumber = req.params.roundnumber
    game.rounds[req.roundnumber - 1] ? next() : next({ code: 'RESNOTFOUND' })
})

router.use('/:roundnumber/askedquestions', askedQuestionsRouter)

router.use(roleAuthentication.roleAuthentication('quizmaster'))

router.put('/:roundnumber/categories', async (req, res) => {
    const game = req.game

    game.rounds[req.roundnumber - 1].categories = req.body.categories
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