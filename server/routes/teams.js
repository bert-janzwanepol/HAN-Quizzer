const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const router = express.Router()
const Game = mongoose.model('Game')

router.post('/', (req, res) => {
    const game = req.game
    const token = jwt.sign({
        role: 'team',
        name: req.body.teamname,
    }, process.env.JWT_SECRET)

    game.addTeam(req.body.teamname)
    res.json({ token: token })
    req.app.get('wss').broadcast({ type: 'TEAMCHAGE' }, game.password, 'quizmaster')
})

router.get('/', (req, res) => {
    res.json({ teams: req.game.teams })
})

router.put('/:teamname/approve', async (req, res) => {
    const game = req.game
    const team = game.teams.find(t => t.name === req.params.teamname)

    if (team) {
        team.approved = true
        game.markModified('teams')
        game.save()
        res.status(200).send()

        req.app.get('wss').broadcast({ type: 'TEAMCHANGE' }, game.password, 'quizmaster')
        req.app.get('wss').sendToTeam({ type: 'TEAMCHANGE' }, game.password, team.name)
    } else {
        const err = { code: "RESNOTFOUND" }
        next(err)
    }
})

module.exports = router;