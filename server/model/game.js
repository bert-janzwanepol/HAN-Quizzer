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

gameSchema.methods.createNewGame = async function createNewGame() {
    await this.model('Game').deleteMany({ quizmaster: this.quizmaster })
    await this.save()
}

gameSchema.methods.addTeam = async function addTeam(teamname) {
    this.teams.push({
        name: teamname,
        approved: false,
        score: 0
    })
    await this.save()
}

const Game = mongoose.model('Game', gameSchema)
exports = gameSchema