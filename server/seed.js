/**
 * Seed file that cleans database and fills with starting values.
 * For now it clears the whole DB and adds some quizzmasters and all questions.
 */
const mongoose = require('mongoose')
const fs = require('fs')
require('./model/answer')
require('./model/askedQuestion')
require('./model/game')
require('./model/question')
require('./model/quizmaster')
require('./model/round')
require('./model/team')

// Models
const Game = mongoose.model('Game')
const Question = mongoose.model('Question')
const Quizmaster = mongoose.model('Quizmaster')

const dbName = 'quizzer'

const db = mongoose.connection

mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    return deleteGames()
}).then(() => {
    return seedQuizmaster()
}).then(() => {
    return seedQuestion()
}).then(() => {
    db.close();
});

async function deleteGames() {
    await Game.deleteMany()
}

async function seedQuizmaster() {
    await Quizmaster.deleteMany()

    await Quizmaster.insertMany([
        {
            name: 'Hendrik'
        },
        {
            name: 'Bert-Jan'
        }
    ])
}

async function seedQuestion() {
    await Question.deleteMany()

    return new Promise((resolve, reject) => {
        fs.readFile('../quizvragen/Vragen.json', (err, data) => {
            if (err) throw reject(err)
            const questions = JSON.parse(data)
            Question.insertMany(questions)
            resolve()
        })
    })
}