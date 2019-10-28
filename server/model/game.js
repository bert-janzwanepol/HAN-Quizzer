const mongoose = require('mongoose')
const teamSchema = require('./team')
const roundSchema = require('./round')

const gameSchema = new mongoose.Schema({
    quizmaster: { type: String, required: true },
    rounds: { type: [roundSchema], required: true },
    //gameName: { type: String, required: true },
    teams: { type: [teamSchema], required: true },
    password: { type: String, required: true }
})

gameSchema.methods.createNewGame = async function createNewGame(next) {
    await this.model('Game').deleteMany({ quizmaster: this.quizmaster })
    await this.save(err => err ? next(err) : true)
}

const Game = mongoose.model('Game', gameSchema)
exports = gameSchema