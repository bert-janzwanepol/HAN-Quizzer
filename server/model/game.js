const mongoose = require('mongoose')
const teamSchema = require('./team')
const roundSchema = require('./round')

const gameSchema = new mongoose.Schema({
    quizmaster: { type: String, required: true },
    rounds: { type: [roundSchema], required: true },
    gameName: { type: String, required: true },
    teams: { type: [teamSchema], required: true },
    password: { type: String, required: true }
})

const Game = mongoose.model('Game', gameSchema)
exports = gameSchema