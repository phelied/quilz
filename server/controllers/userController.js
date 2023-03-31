const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const quiz = require('../data/quizData.json');

const userDataFilePath = path.join(__dirname, '../data/userData.json');
const rawData = fs.readFileSync(userDataFilePath);
const data = JSON.parse(rawData);


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const UserController = {
    signup: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Check if user exists
            const userExists = data.users.find((user) => user.email === email);
            if (userExists) {
                return res.status(409).send('Cet email est déjà utilisé');
            }

            // Hash the password
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            //  Create new user with unique id
            const newUser = {
                id: (data.users.length + 1).toString(),
                email: email,
                password: hashedPassword,
                quizzes: []
            };

            data.users.push(newUser);

            fs.writeFileSync(userDataFilePath, JSON.stringify(data));

            // Create token for user
            const accessToken = jwt.sign({ id: newUser.id, email: newUser.email }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

            // Send response with token in body
            res.status(201).json({ accessToken: accessToken });
        } catch (error) {
            res.status(500).send('Erreur serveur');
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = data.users.find((user) => user.email === email);
            if (!user) {
                return res.status(401).send('Identifiant ou mot de passe incorrect');
            }

            // check if password is correct
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send('Identifiant ou mot de passe incorrect');
            }
            // Create token for user
            const accessToken = jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            // Send response with token in body
            res.status(200).json({ accessToken: accessToken });
        } catch (error) {
            res.status(500).send('Erreur serveur');
        }
    },

    result: async (req, res) => {
        try {
            // Get user id from token
            const userId = req.user.id;
            const user = data.users.find((user) => user.id === userId);
            // Add result to user
            if (user) {
                const quizExists = quiz.quizzes.find((quiz) => quiz.id === req.body.id);
                user.quizzes.push({ id: req.body.id, score: req.body.result.score, date: new Date(), topic: quizExists.topic });
                fs.writeFileSync(userDataFilePath, JSON.stringify(data));
                console.log(user.quizzes)
                return true;
            }
        } catch (error) {
            res.status(500).send('Erreur serveur');
        }

    },

    profile: async (req, res) => {
        try {
            // Get user id from token
            const userId = req.user.id;
            const user = data.users.find((user) => user.id === userId);
            // Send user data
            if (user) {
                res.json(user);
            } else {
                res.status(404).send('Utilisateur introuvable');
            }
        } catch (error) {
            res.status(500).send('Erreur serveur');
        }
    }
};


module.exports = UserController;
