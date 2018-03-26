const passport = require('passport');
const express = require('express');
const request = require('request');

// user auth
const Strategy = require('passport-github2').Strategy;
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const SessionStore = require('session-file-store')(expressSession);

const tmpdir = require('os').tmpdir();
const User = require('./db/user');
const router = express.Router();

module.exports = router;

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

passport.use(
  'github',
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // callbackURL: process.env.GITHUB_CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {
      const {
        login: username,
        id,
        avatar_url: avatar,
        email,
        name,
      } = profile._json;
      User.findOrCreate({ id }, { username, id, avatar, email, name })
        .then(user => {
          if (user.email) {
            return done(null, user);
          }

          // otherwise go get their email address and store it
          request(
            {
              url: 'https://api.github.com/user/emails',
              json: true,
              headers: {
                'user-agent':
                  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
                authorization: `token ${accessToken}`,
              },
            },
            (error, res, body) => {
              if (error) {
                return done(null, user);
              }

              user.email = body.find(_ => _.primary).email;

              user
                .save()
                .then(user => done(null, user))
                .catch(done);
            }
          );
        })
        .catch(e => done(e));
    }
  )
);

router.use(cookieParser());
router.use(
  expressSession({
    resave: true,
    secret: process.env.SESSION_SECRET || Math.random(),
    name: 'id',
    httpOnly: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 60 * 1000, // milliseconds
    },
    store: new SessionStore({ path: tmpdir + '/sessions' }),
  })
);
router.use(passport.initialize());
router.use(passport.session());

router.get('/auth', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/auth/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    // session: false,
  }),
  (req, res) => {
    res.redirect(`${process.env.HOST}/?token=${req.user.bearer()}`);
  }
);
