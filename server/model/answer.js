const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    answer: { type: String, required: true },
    correct: { type: Boolean, required: true }
})

const Answer = mongoose.model('Answer', answerSchema)
exports = answerSchema