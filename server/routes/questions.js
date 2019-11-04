require('../model/question')
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Question = mongoose.model('Question')

router.get('/', async (req, res) => {
    const game = req.game
    const askedQuestions = game.rounds.map(round => round.questions.id)
    const round = game.rounds[req.roundnumber - 1]
    const questions = await Question.getRandom(round.categories, askedQuestions)

    res.json({ questions: questions })
})

module.exports = router;