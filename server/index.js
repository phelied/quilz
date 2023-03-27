const express = require('express');
const app = express();

app.get('/quizzes', (req, res) => {
    const quizzes = [
        { id: 1, name: 'Geography Quiz' },
        { id: 2, name: 'History Quiz' },
        { id: 3, name: 'Science Quiz' }
    ];
    res.json(quizzes);
});


app.get('/quizzes/:id', (req, res) => {
    const quizId = parseInt(req.params.id);
    const questions = [
        { id: 1, quizId: 1, question: 'What is the capital of France?', answer: 'Paris' },
        { id: 2, quizId: 1, question: 'What is the largest country in the world?', answer: 'Russia' },
        { id: 3, quizId: 2, question: 'What year did World War II end?', answer: '1945' },
        { id: 4, quizId: 2, question: 'Who invented the telephone?', answer: 'Alexander Graham Bell' },
        { id: 5, quizId: 3, question: 'What is the smallest unit of matter?', answer: 'Atom' },
        { id: 6, quizId: 3, question: 'Who discovered penicillin?', answer: 'Alexander Fleming' }
    ];
    const quizQuestions = questions.filter(q => q.quizId === quizId);
    res.json(quizQuestions);
});
