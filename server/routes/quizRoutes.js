const express = require('express');
const router = express.Router();
const passport = require('passport');
const quizController = require('../controllers/quizController');

//  Get all quizzes
router.get('/', quizController.getAllQuizzes);

// Get quiz by ID
router.get('/quiz/:id',  passport.authenticate('jwt', { session: false }), quizController.getQuizById);

module.exports = router;
