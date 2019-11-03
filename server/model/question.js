const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    category: { type: String, required: true }
})

questionSchema.statics.getRandom = async function (categories, isnot) {
    return categories.map(async categorie => {
        const count = await this.countDocuments({ category: categorie })
        return await this.findOne({ category: categorie }).skip(Math.floor(Math.random() * count)).exec()
    })
}

const Question = mongoose.model('Question', questionSchema)
exports = questionSchema