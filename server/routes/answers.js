const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const Answer = mongoose.model('Answer')

router.post('/', async (req, res) => {
    const team = req.user
    const game = req.game
    const answers = new Answer({
        teamName: team.name,
        answer: req.body.answer,
        correct: null
    })

    game.rounds[req.roundnumber - 1].questions.push(askedQuestion)
    game.markModified('rounds')
    await game.save()

    req.app.get('wss').broadcast({ type: 'QUESTIONASKED' }, game.password, 'teams')

    res.sendStatus(201)
})

module.exports = router;