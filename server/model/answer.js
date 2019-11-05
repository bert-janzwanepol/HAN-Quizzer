const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    answer: { type: String, required: true },
    correct: Boolean
})

const Answer = mongoose.model('Answer', answerSchema)
exports = answerSchema