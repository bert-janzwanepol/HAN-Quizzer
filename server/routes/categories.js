require('../model/question')
const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();

const Question = mongoose.model('Question')

router.get('/', async (req, res, next) => {
    let categories = await Question.find().distinct('category')
    res.json({ categories: categories })
})

module.exports = router;