var express = require('express');
var router = express.Router();

var teamsRouter = require('./teams')
var roundsRouter = require('./rounds')
var applicantsRouter = require('./applicants')

router.use('/teams', teamsRouter)
router.use('/rounds', roundsRouter)
router.use('/applicants', applicantsRouter)


module.exports = router;