const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const passport = require('passport');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const fs = require('fs');
const path = require('path');


// Middleware for authentication with token
passport.use(new JWTStrategy({
    secretOrKey: ACCESS_TOKEN_SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer')
},
    async (token, done) => {
        try {
            const userDataFilePath = path.join(__dirname, '../data/userData.json');
            const rawData = fs.readFileSync(userDataFilePath);
            const data = JSON.parse(rawData);
            const user = data.users.find(u => u.email === token.email);
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