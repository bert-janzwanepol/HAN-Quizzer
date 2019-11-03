const mongoose = require('mongoose')
const askedQuestionSchema = require('./askedQuestion')

const roundSchema = new mongoose.Schema({
    number: { type: Number, required: true },
    categories: { type: [String], required: true },
    maxQuestions: { type: Number, required: true },
    questions: { type: [askedQuestionSchema], required: true }
})

const Round = mongoose.model('Round', roundSchema)
exports = roundSchema