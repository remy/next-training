const passport = require('passport');
const User = require('./strategy/user');

if (process.env.NODE_ENV !== 'test') {
  passport.use('github', require('./strategy/github').strategy);
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ id })
    .then(user => {
      done(null, user);
    })
    .catch(done);
});

module.exports = passport;
