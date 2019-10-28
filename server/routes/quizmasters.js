require('../model/quizmaster')

const express = require('express');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const router = express.Router();
const Quizmaster = mongoose.model('Quizmaster')

router.post('/login', async (req, res) => {
    const qm = await Quizmaster.findOne({ name: req.body.name }).exec()

    if (!qm) {
        next('NOQMFOUND')
    }

    const token = jwt.sign({
        role: 'quizmaster',
        name: qm.name,
    }, 'bertjanenhendrikzijnfuckingcool10024')
    res.json({ token: token })
})

module.exports = router;