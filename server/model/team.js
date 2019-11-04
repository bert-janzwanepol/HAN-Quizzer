const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    approved: { type: Boolean, required: true },
    score: { type: Number, required: true }
})

const Team = mongoose.model('Team', teamSchema)
exports = teamSchema