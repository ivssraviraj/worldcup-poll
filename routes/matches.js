
const express = require('express');
const {authenticateToken} = require("../Controlllers/AuthenticationController");
const {updateMatchResult, upcomingMatchController, allMatchController} = require("../Controlllers/MatchesController");

const router = express.Router();


router.post('/updateMatchResult',updateMatchResult)
router.get('/upcomingMatches', authenticateToken, upcomingMatchController)
router.get('/allMatches', authenticateToken, allMatchController)


module.exports = router;
