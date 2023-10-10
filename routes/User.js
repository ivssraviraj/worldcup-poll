
const express = require('express');
const {authenticateToken} = require("../Controlllers/AuthenticationController");
const {leaderBoardController, getPollsController, submitPollsController} = require("../Controlllers/UserController");

const router = express.Router();


router.get('/leaderBoard',leaderBoardController)
router.get('/getPolls',getPollsController)

router.post('/submitPoll',authenticateToken,submitPollsController)







module.exports = router;
