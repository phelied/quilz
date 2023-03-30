const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userData = require('../data/UserData.json');
const fs = require('fs');
const path = require('path');

const userDataFilePath = path.join(__dirname, '../data/userData.json');
const rawData = fs.readFileSync(userDataFilePath);
const data = JSON.parse(rawData);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const UserController = {
    signup: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Vérifie si l'utilisateur existe déjà
            const userExists = data.users.find((user) => user.email === email);
            if (userExists) {
                return res.status(409).send('Cet email est déjà utilisé');
            }

            // Hash le mot de passe avant de le stocker dans le fichier UserData
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            // Crée un nouvel utilisateur avec un ID unique
            const newUser = {
                id: (data.users.length + 1).toString(),
                email: email,
                password: hashedPassword,
                quizzes: []
            };

            // Ajoute le nouvel utilisateur au tableau des utilisateurs
            data.users.push(newUser);

            fs.writeFileSync(userDataFilePath, JSON.stringify(data));

            // Génère un jeton d'accès pour l'utilisateur
            const accessToken = jwt.sign({ id: newUser.id, email: newUser.email }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

            // Envoie la réponse avec le jeton d'accès dans le corps de la réponse
            res.status(201).json({ accessToken: accessToken });
        } catch (error) {
            res.status(500).send('Erreur serveur');
        }
    },
    signin: async (req, res) => {
        try {
            const userDataFilePath = path.join(__dirname, '../data/userData.json');
            const rawData = fs.readFileSync(userDataFilePath);
            const data = JSON.parse(rawData);
            const { email, password } = req.body;

            // Vérifie si l'utilisateur existe déjà
            const user = data.users.find((user) => user.email === email);
            if (!user) {
                return res.status(401).send('Identifiant ou mot de passe incorrect');
            }

            // Vérifie si le mot de passe est correct en comparant le hash stocké avec le mot de passe fourni
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send('Identifiant ou mot de passe incorrect');
            }

            // Génère un jeton d'accès pour l'utilisateur
            const accessToken = jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            // Envoie la réponse avec le jeton d'accès dans le corps de la réponse
            res.status(200).json({ accessToken: accessToken });
        } catch (error) {
            res.status(500).send('Erreur serveur');
        }
    },

    result: async (req, res) => {
        // console.log(req.body, req.data)
        const userDataFilePath = path.join(__dirname, '../data/userData.json');
        const rawData = fs.readFileSync(userDataFilePath);
        const data = JSON.parse(rawData);
        const userId = req.user.id;
        const user = data.users.find((user) => user.id === userId);
        if (user) {
            const quizIndex = user.quizzes.findIndex((quiz) => quiz.id === req.body.id);
            if (quizIndex > -1) {
                // Quiz already exists, update the score
                user.quizzes[quizIndex].score = req.body.result.score;
            } else {
                // Quiz does not exist, add it
                user.quizzes.push({ id: req.body.id, score: req.body.result.score });
            }
        }
    },

    profile: async (req, res) => {
        const userDataFilePath = path.join(__dirname, '../data/userData.json');
        const rawData = fs.readFileSync(userDataFilePath);
        const data = JSON.parse(rawData);
        const userId = req.user.id;
        const user = data.users.find((user) => user.id === userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Utilisateur introuvable');
        }
    }
}


module.exports = UserController;
