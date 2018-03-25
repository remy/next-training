const express = require('express');
const db = require('./db');
const { json } = require('body-parser');
const nickGenerator = require('nick-generator');
const slug = require('slug');
const router = express.Router();

module.exports = router;
router.use(json());

function makeUsername(username = nickGenerator()) {
  return slug(username).toLowerCase();
}

function authRequired(req, res, next) {
  if (!req.user.value()) {
    return res.status(401).json(401); // unauthorized
  }

  next();
}

function find(username) {
  return db
    .get('users')
    .find({ username })
    .value();
}

router.use((req, res, next) => {
  const [, token] = (req.headers['authorization'] || '').split(' ', 2);

  if (token) {
    const user = db.get('users').find({ token });
    if (user) {
      req.user = user;
    }
  }

  next();
});

router.get('/', authRequired, (req, res) => res.json(req.user.value()));

router.put('/', authRequired, (req, res) => {
  req.user.assign(req.body).write();
  res.status(200).json(true);
});

router.post('/', (req, res) => {
  const username = makeUsername(req.body.username);
  if (find(username)) {
    return res.status(406).json(406); // not accepted
  }

  const user = db
    .get('users')
    .push({
      password: 'let me in',
      ...req.body,
      username,
      token: Date.now().toString(),
    })
    .write();
  res.status(201).json(user);
});
