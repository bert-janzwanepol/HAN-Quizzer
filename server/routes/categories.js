require('../model/question')
const express = require('express')
const mongoose = require('mongoose')
const roleAuthentication = require('../middleware/roleauthentication')
const router = express.Router();

const Question = mongoose.model('Question')

router.use(roleAuthentication.roleAuthentication('quizmaster'))

router.get('/', async (req, res, next) => {
    let categories = await Question.find().distinct('category')
    res.json({ categories: categories })
})

module.exports = router;