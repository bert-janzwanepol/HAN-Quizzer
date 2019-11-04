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

// Environment variables
const dotenv = require('dotenv')
dotenv.config();

// Models
const Game = mongoose.model('Game')
const Question = mongoose.model('Question')
const Quizmaster = mongoose.model('Quizmaster')

const dbName = 'quizzer'

const db = mongoose.connection

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    return deleteGames()
}).then(() => {
    return seedQuizmaster()
}).then(() => {
    return seedQuestion()
}).then(() => {
    return mockGame()
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

async function mockGame() {
    await Game.deleteMany();

    await Game.create({
        quizmaster: 'Bert-Jan',
        rounds: [],
        teams: [
            {
                name: 'my team',
                approved: false,
                score: 0
            }
        ],
        password: 'abcde'
    });
}