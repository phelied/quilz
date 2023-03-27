// Middleware for token authentication
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserController = require('../controllers/userController');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Route for creating a new user with email and password
router.post('/signup', UserController.signup);

// Route for logging in with email and password
router.post('/login', UserController.login);

// Route that requires authentication using token
router.get('/profile', authenticateToken, UserController.profile);

module.exports = router;