require('../model/quizmaster')

const express = require('express');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const router = express.Router();
const Quizmaster = mongoose.model('Quizmaster')

router.post('/login', async (req, res, next) => {
    const qm = await Quizmaster.findOne({ name: req.body.name }).exec()

    if (!qm) {
        err = { code: 'NOQMFOUND' }
        next(err)
    }

    const token = jwt.sign({
        role: 'quizmaster',
        name: qm.name,
    }, process.env.JWT_SECRET)

    res.json({ token: token })
})

module.exports = router;