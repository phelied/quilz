const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const users = require('../data/userData.json');
const passport = require('passport');


// Configuration de la stratégie d'authentification JWT
passport.use(new JWTStrategy({
    secretOrKey: 'your_jwt_secret',
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
},
    async (token, done) => {
        try {
            const user = users.find(u => u.id === token.user.id);
            if (!user) {
                return done(null, false, { message: 'Utilisateur introuvable' }); // Si l'utilisateur n'existe pas, renvoyer une réponse avec un message d'erreur
            }
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
));

module.exports = passport;