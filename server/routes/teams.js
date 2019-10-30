const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

router.post('/', (req, res, next) => {
    const game = req.game
    const token = jwt.sign({
        role: 'team',
        name: req.body.teamname,
    }, process.env.JWT_SECRET)

    game.addTeam(req.body.teamname)
    res.json({ token: token })
    req.app.get('wss').broadcast({ type: 'NEWAPPLICANT' }, game.password, 'quizmaster', 'teams')
})

module.exports = router;