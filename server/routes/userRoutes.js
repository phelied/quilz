// Middleware for token authentication
const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/userController');

// Route for creating a new user with email and password
router.post('/signup', UserController.signup);

// Route for logging in with email and password
router.post('/signin', UserController.signin);

// Route that requires authentication using token
router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.profile);


router.get('/users', UserController.users);
module.exports = router;