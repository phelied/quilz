const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

//  Get all quizzes
router.get('/', quizController.getAllQuizzes);

// Get quiz by ID
router.get('/:id', quizController.getQuizById);

module.exports = router;
