const express = require('express')
const mongoose = require('mongoose')
const roleAuthentication = require('../middleware/roleAuthentication')
const router = express.Router()

const Answer = mongoose.model('Answer')

router.post('/', async (req, res) => {
    const team = req.user
    const game = req.game
    const answers = game.rounds[req.roundnumber - 1].questions[req.questionNumber - 1].answers
    const teamanswer = answers.find(answer => answer.teamName === team.name)

    if (!teamanswer || !teamanswer.correct) {
        const answer = new Answer({
            teamName: team.name,
            answer: req.body.answer
        })
        if (!teamanswer) {
            answers.push(answer)
        } else {
            answers = answers.map(a => a.teamName === answer.teamName ? answer : a)
        }
        game.markModified('rounds')
        await game.save()

        req.app.get('wss').broadcast({ type: 'NEWANSWER' }, game.password, 'quizmaster')

        res.sendStatus(201)
    } else {
        res.sendStatus(409)
    }
})

router.get('/results', (req, res) => {
    res.json({
        answers: req.game.rounds[req.roundnumber - 1].questions[req.questionNumber - 1].answers.map(a => {
            return { teamname: a.teamName, correct: a.correct }
        })
    })
})

router.use(roleAuthentication.roleAuthentication('quizmaster'))

router.get('/', (req, res) => {
    res.json(
        req.game.rounds[req.roundnumber - 1].questions[req.questionNumber - 1].answers
    )
})

router.put('/', async (req, res) => {
    const game = req.game
    const answer = game.rounds[req.roundnumber - 1].questions[req.questionNumber - 1].answers.find(a => a.teamName === req.body.teamname)

    answer.correct = req.body.correct
    game.markModified('rounds')
    await game.save()

    req.app.get('wss').sendToTeam({ type: 'ANSWERJUDGED' }, game.password, req.body.teamname)
    req.app.get('wss').broadcast({ type: 'NEWSTANDINGS' }, game.password, 'scoreboard')


    res.sendStatus(200)
})

module.exports = router;