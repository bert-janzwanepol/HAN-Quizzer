const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Question = mongoose.model('Question')

router.get('/:questionId', async (req, res) => {
    const { question, category } = await Question.findOne({ _id: req.params.questionId })
    console.log(question, category)
    res.json({ question, category })
})

module.exports = router;