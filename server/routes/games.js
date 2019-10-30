require('../model/game')
const express = require('express');
const mongoose = require('mongoose')

const teamsRouter = require('./teams')
const roundsRouter = require('./rounds')

const router = express.Router();
const Game = mongoose.model('Game')

router.use('/:password', async (req, res, next) => {
    const game = await Game.findOne({ password: req.params.password }).exec()
    req.game = game
    next()
})

router.use('/:password/teams', teamsRouter)
router.use('/:password/rounds', roundsRouter)

router.post('/', (req, res, next) => {
    const gamebody = {
        quizmaster: req.user.name,
        rounds: [],
        gameName: req.body.gamename,
        teams: [],
        password: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    }

    const game = new Game(gamebody)
    game.createNewGame()

    res.json(gamebody)
})


module.exports = router;