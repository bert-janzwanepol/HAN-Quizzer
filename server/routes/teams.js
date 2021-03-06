const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const sorter = require('../utils/sorter.js')
const roleAuthentication = require('../middleware/roleAuthentication')

const router = express.Router()
const Game = mongoose.model('Game')

router.post('/', (req, res) => {
    const game = req.game

    if (game.rounds.length || game.teams.find(t => t.name === req.body.name)) {
        res.status(409).send()
    } else {
        const token = jwt.sign({
            role: 'team',
            name: req.body.name
        }, process.env.JWT_SECRET)

        game.addTeam(req.body.name)
        res.json({ token: token })
        req.app.get('wss').broadcast({ type: 'TEAMCHANGE', roomkey: game.password }, game.password, 'quizmaster')
    }
})

router.get('/', (req, res) => {
    res.json({ teams: req.game.teams })
})

router.get('/standings', (req, res) => {
    const game = req.game
    const standing = []

    game.teams.forEach(team => {
        const teamStats = {
            teamname: team.name,
            score: team.score,
            answersCorrect: game.rounds.map(round => {
                return round.questions.map(q => {
                    const answer = q.answers.find(a => a.teamName === team.name)
                    return answer ? answer : { correct: false }
                }).filter(answer => answer.correct).length
            }
            )
        }
        standing.push(teamStats)
    })
    standing.sort(sorter.sortTeams)
    res.json(standing)
})

router.use(roleAuthentication.roleAuthentication('quizmaster'))

router.delete('/:teamname', async (req, res) => {
    const game = req.game
    game.teams = game.teams.filter(t => req.params.teamname !== t.name)

    game.markModified('teams')
    game.save()
    req.app.get('wss').sendToTeam({ type: 'TEAMDELETED' }, game.password, req.params.teamname)
    req.app.get('wss').removeTeam(game.password, req.params.teamname)

    res.sendStatus(200)
})

router.put('/:teamname/approve', async (req, res) => {
    const game = req.game
    const team = game.teams.find(t => t.name === req.params.teamname)

    if (team) {
        team.approved = true
        game.markModified('teams')
        game.save()

        req.app.get('wss').broadcast({ type: 'TEAMCHANGE', roomkey: game.password }, game.password, 'quizmaster')
        req.app.get('wss').broadcast({ type: 'TEAMCHANGE', roomkey: game.password }, game.password, 'scoreboard')
        req.app.get('wss').sendToTeam({ type: 'TEAMCHANGE', approved: team.approved }, game.password, team.name)
        res.sendStatus(200)
    } else {
        const err = { code: "RESNOTFOUND" }
        next(err)
    }
})

module.exports = router;