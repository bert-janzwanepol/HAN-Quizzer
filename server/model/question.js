const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true }
})

questionSchema.statics.getRandom = async function (categorie, isnot) {
    const count = await this.countDocuments({ category: categorie })
    const question = await this.findOne({ category: categorie }).skip(Math.floor(Math.random() * count)).exec()
    return question
}

const Question = mongoose.model('Question', questionSchema)
exports = questionSchema