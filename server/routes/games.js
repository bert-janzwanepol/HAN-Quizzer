require('../model/game')
const express = require('express');
const mongoose = require('mongoose')

const teamsRouter = require('./teams')
const roundsRouter = require('./rounds')
const applicantsRouter = require('./applicants')

const router = express.Router();
const Game = mongoose.model('Game')

router.use('/teams', teamsRouter)
router.use('/rounds', roundsRouter)
router.use('/applicants', applicantsRouter)

router.post('/', (req, res, next) => {
    const gamebody = {
        quizmaster: req.user.name,
        rounds: [],
        gameName: req.body.gamename,
        teams: [],
        password: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    }

    const game = new Game(gamebody)
    game.createNewGame(next)

    res.json(gamebody)
})


module.exports = router;