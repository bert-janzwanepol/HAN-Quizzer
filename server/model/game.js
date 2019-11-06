const mongoose = require('mongoose')
const teamSchema = require('./team')
const roundSchema = require('./round')

const Round = mongoose.model('Round')
const Team = mongoose.model('Team')

const gameSchema = new mongoose.Schema({
    quizmaster: { type: String, required: true },
    rounds: { type: [roundSchema], required: true },
    teams: { type: [teamSchema], required: true },
    password: { type: String, required: true }
})

gameSchema.methods.createNewGame = async function () {
    await this.model('Game').deleteMany({ quizmaster: this.quizmaster })
    await this.save()
}

gameSchema.methods.addTeam = async function (teamname) {
    const newTeam = new Team({
        name: teamname,
        approved: false,
        score: 0
    })

    this.teams.push(newTeam)
    this.markModified('teams')
    await this.save()
}

gameSchema.methods.start = async function () {
    const round1 = new Round({
        number: 1,
        maxQuestions: 12,
        questions: [],
        categories: []
    })

    this.teams = this.teams.filter(t => t.approved)
    this.rounds.push(round1)
    this.save()
}

const Game = mongoose.model('Game', gameSchema)
exports = gameSchema