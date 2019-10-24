var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.send('halo')
    // :TODO Pagina renderen met drie links quizmaster/teams/beamer
});

module.exports = router;