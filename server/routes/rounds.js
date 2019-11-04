require('../model/game')
const express = require('express')
const router = express.Router()

const questionsRouter = require('./questions')

router.use('/:roundnumber', (req, res, next) => {
    req.roundnumber = req.params.roundnumber
    next()
})

router.use('/:roundnumber/questions', questionsRouter)

router.put('/:roundnumber/categories', async (req, res) => {
    const game = req.game

    game.rounds[req.params.roundnumber - 1].categories = req.body.categories
    game.markModified('rounds')
    game.save()

    res.status(200).send()
})

module.exports = router;