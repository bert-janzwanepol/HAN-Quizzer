const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Answer = mongoose.model('Answer')

router.post('/', async (req, res) => {
    const team = req.user
    const game = req.game
    const answers = game.rounds[req.roundnumber - 1].questions[req.questionNumber - 1].answers

    if (!answers.find(answer => answer.teamName === team.name && answer.correct !== null)) {
        const answer = new Answer({
            teamName: team.name,
            answer: req.body.answer
        })
        answers.push(answer)
        game.markModified('rounds')
        await game.save()

        req.app.get('wss').broadcast({ type: 'NEWANSWER' }, game.password, 'quizmaster')

        res.sendStatus(201)
    } else {
        res.sendStatus(409)
    }

})

router.put('/', async (req, res) => {
    const game = req.game
    const answer = game.rounds[req.roundnumber - 1].questions[req.questionNumber - 1].answers.find(a => a.teamName === req.body.teamname)
    answer.correct = req.body.correct
    game.markModified('rounds')
    await game.save()

    req.app.get('wss').sendToTeam({ type: 'ANSWERJUDGED' }, game.password, req.body.teamname)

    res.sendStatus(200)
})

module.exports = router;