const mongoose = require('mongoose')
const teamSchema = require('./team')
const roundSchema = require('./round')
const sorter = require('../utils/sorter.js')

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
    this.teams = this.teams.filter(t => t.approved)
    await this.save()
}

gameSchema.methods.startNewRound = async function () {
    const round = new Round({
        number: this.rounds.length + 1,
        maxQuestions: 12,
        questions: [],
        categories: []
    })
    this.rounds.push(round)
    await this.save()
}

gameSchema.methods.closeRound = async function (roundnumber) {
    const teamsPoints = []
    const round = this.rounds[roundnumber - 1]

    this.teams.forEach(team => {
        teamsPoints.push({
            name: team.name,
            score: round.questions.map(q => {
                const answer = q.answers.find(a => a.teamName === team.name)
                return answer ? answer : { correct: false }
            }).filter(answer => answer.correct).length
        })
    })
    teamsPoints.sort(sorter.sortTeams)


    teamsPoints.forEach((teamPoints, i) => {
        this.teams.forEach(team => {
            if (team.name === teamPoints.name)
                team.score += (teamPoints.score + this.teams.length - i)
        })
    })
    this.markModified('teams')
    await this.save()
}

const Game = mongoose.model('Game', gameSchema)
exports = gameSchema