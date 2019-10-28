const mongoose = require('mongoose')
const answerSchema = require('./answer')

const roundSchema = new mongoose.Schema({
    questionId: { type: Number, required: true },
    answers: { type: [answerSchema], required: true },
    closed: { type: Boolean, required: true }
})

const AskedQuestion = mongoose.model('Round', roundSchema)
exports = roundSchema