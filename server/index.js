const express = require('express');
const app = express();
const quizRoutes = require('./routes/quizRoutes');

// Middleware pour parser le JSON dans les requêtes POST
app.use(express.json());

// Routes
app.use('/', quizRoutes);

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

