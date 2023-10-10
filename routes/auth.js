
const express = require('express');
const {authenticateToken, signUpController, loginController} = require("../Controlllers/AuthenticationController");
const {updateMatchResult} = require("../Controlllers/MatchesController");

const router = express.Router();


router.post('/signup',signUpController)
router.post('/login', loginController)


module.exports = router;
