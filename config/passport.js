const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const db = require('../app/models');
const users = db.users;

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtPrivateKey,
  };
  passport.use('jwt', new JwtStrategy(opts, function (jwt_payload, done) {
    try {
      users
        .findByPk(jwt_payload.id)
        .then((user) => {
          if (user.password != jwt_payload.password)
            return done('Authentication failed. Wrong password.', false);

          return done(null, user);
        })
        .catch((error) => {
          console.log(error);
          return done(error, false);
        });
    } catch (error) {
      console.log(error);
    }
  }));
};