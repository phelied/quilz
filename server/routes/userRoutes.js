// Middleware for token authentication
const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/userController');
const { userSchema } = require('../utils/validationSchema');


const validateUserInput = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Route for creating a new user with email and password
router.post('/signup', validateUserInput, UserController.signup);

// Route for logging in with email and password
router.post('/signin', validateUserInput, UserController.signin);

// Route for getting user profile
router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.profile);

// Route for adding result to user profile
router.post('/result', passport.authenticate('jwt', { session: false }), UserController.result);

module.exports = router;