const express = require('express');
const db = require('./db');
const { json } = require('body-parser');
const router = express.Router();

module.exports = router;
router.use(json());

function authRequired(req, res, next) {
  if (!req.user.value()) {
    return res.status(401).json(401); // unauthorized
  }

  next();
}

function find(user) {
  return db
    .get('users')
    .find({ user })
    .value();
}

router.use((req, res, next) => {
  const [type, token] = (req.headers['authorization'] || '').split(' ', 2);

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
  if (find(req.params.user)) {
    return res.status(406).json(406); // not accepted
  }

  const user = db
    .get('users')
    .push({
      password: 'let me in',
      ...req.body,
      user: req.params.user,
      token: Date.now().toString(),
    })
    .write();
  res.status(201).json(user);
});
