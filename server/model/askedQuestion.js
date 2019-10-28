const mongoose = require('mongoose')
const answerSchema = require('./answer')

const askedQuestionSchema = new mongoose.Schema({
    questionId: { type: String, required: true },
    answers: { type: [answerSchema], required: true },
    closed: { type: Boolean, required: true }
})

const AskedQuestion = mongoose.model('AskedQuestion', askedQuestionSchema)
exports = askedQuestionSchema