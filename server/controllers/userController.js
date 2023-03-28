const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userData = require('../data/UserData.json');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const UserController = {
    signup: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Vérifie si l'utilisateur existe déjà
            const userExists = userData.users.find((user) => user.email === email);
            if (userExists) {
                return res.status(409).send('Cet email est déjà utilisé');
            }

            // Hash le mot de passe avant de le stocker dans le fichier UserData
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            // Crée un nouvel utilisateur avec un ID unique
            const newUser = {
                id: (userData.users.length + 1).toString(),
                email: email,
                password: hashedPassword,
                quizzes: []
            };

            // Ajoute le nouvel utilisateur au tableau des utilisateurs
            userData.users.push(newUser);

            // Génère un jeton d'accès pour l'utilisateur
            const accessToken = jwt.sign({ id: newUser.id }, ACCESS_TOKEN_SECRET);

            // Envoie la réponse avec le jeton d'accès dans le corps de la réponse
            res.status(201).json({ accessToken: accessToken });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur serveur');
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Vérifie si l'utilisateur existe déjà
            const user = userData.users.find((user) => user.email === email);
            if (!user) {
                return res.status(401).send('Identifiant ou mot de passe incorrect');
            }

            // Vérifie si le mot de passe est correct en comparant le hash stocké avec le mot de passe fourni
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send('Identifiant ou mot de passe incorrect');
            }

            // Génère un jeton d'accès pour l'utilisateur
            const accessToken = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET);

            // Envoie la réponse avec le jeton d'accès dans le corps de la réponse
            res.status(200).json({ accessToken: accessToken });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erreur serveur');
        }
    },
    users: async (req, res) => {
        res.json(userData);
    },
    profile: async (req, res) => {
        const userId = req.user.id;
        const user = userData.users.find((user) => user.id === userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('Utilisateur introuvable');
        }
    }
}


module.exports = UserController;
