const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Answer = mongoose.model('Answer')

router.post('/', async (req, res) => {
    const team = req.user
    const game = req.game
    const answer = new Answer({
        teamName: team.name,
        answer: req.body.answer,
        correct: null
    })

    game.rounds[req.roundnumber - 1].questions[req.questionnumber - 1].answers.push(answer)
    game.markModified('rounds')
    await game.save()

    req.app.get('wss').broadcast({ type: 'NEWANSWER' }, game.password, 'quizmaster')

    res.sendStatus(201)
})

router.put('/', async (req, res) => {
    game.rounds[req.roundnumber - 1].questions[req.questionnumber - 1].answers.find(a => a.teamName === req.body.teamname).correct = req.body.correct
    game.markModified('rounds')
    await game.save()

    req.app.get('wss').sendToTeam({ type: 'ANSWERJUDGED' }, game.password, req.body.teamname)

    res.sendStatus(201)
})

module.exports = router;