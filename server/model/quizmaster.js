const mongoose = require('mongoose')

const quizmasterSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const Quizmaster = mongoose.model('Quizmaster', quizmasterSchema)
exports = quizmasterSchema