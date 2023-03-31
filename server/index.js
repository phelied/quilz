require('dotenv').config();
const express = require('express');
const app = express();
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const passport = require('./utils/auth');
const cors = require('cors');

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());

// Middleware for authentication
app.use(passport.initialize());

// Routes
app.use('/', quizRoutes);
app.use('/', userRoutes);

// Middleware for handling errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

