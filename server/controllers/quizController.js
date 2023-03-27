const quizData = require('../data/quizData.json');

// get all quizzes
const getAllQuizzes = (req, res) => {
    res.json(quizData);
};

// get quiz by ID
const getQuizById = (req, res) => {
    const quizId = req.params.id;
    const quiz = quizData.quizzes.find(q => q.id === quizId);
    if (quiz) {
        res.json(quiz);
    } else {
        res.status(404).send('Quiz not found');
    }
};

module.exports = {
    getAllQuizzes,
    getQuizById,
};
