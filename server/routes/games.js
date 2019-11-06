require('../model/game')
const express = require('express')
const mongoose = require('mongoose')
const roleAuthentication = require('../middleware/roleAuthentication')

const teamsRouter = require('./teams')
const roundsRouter = require('./rounds')

const router = express.Router()
const Game = mongoose.model('Game')

router.use('/:password', async (req, res, next) => {
    const game = await Game.findOne({ password: req.params.password }).exec()
    if (game) {
        req.game = game
        next()
    } else {
        err = { code: 'RESNOTFOUND' }
        next(err)
    }
})

router.use('/:password/teams', teamsRouter)
router.use('/:password/rounds', roundsRouter)

router.use(roleAuthentication.roleAuthentication('quizmaster'))

router.post('/', (req, res, next) => {
    const gamebody = {
        quizmaster: req.user.name,
        rounds: [],
        teams: [],
        password: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    }

    const game = new Game(gamebody)
    game.createNewGame()

    res.json(gamebody)
})

router.put('/:password/start', (req, res) => {
    const game = req.game

    game.start()
    req.app.get('wss').broadcast({ type: 'STARTGAME' }, game.password, 'quizmaster', 'teams')
    res.sendStatus(200)
})

router.put('/:password/close', (req, res) => {
    req.app.get('wss').broadcast({ type: 'CLOSEGAME' }, game.password, 'quizmaster', 'teams')
    res.sendStatus(200)
})


module.exports = router;