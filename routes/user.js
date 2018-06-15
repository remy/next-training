const express = require('express');
const User = require('./db/user');
const { json } = require('body-parser');
const nickGenerator = require('nick-generator');
const slug = require('slug');
const jwt = require('jsonwebtoken');
const router = express.Router();

module.exports = router;
router.use(json());

function makeUsername(username = nickGenerator()) {
  return slug(username).toLowerCase();
}

function authRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).json(401); // unauthorized
  }

  next();
}

function find(username) {
  return User.findOne({ username });
}

router.use(async (req, res, next) => {
  const [type, token] = (req.headers['authorization'] || '').split(' ', 2);

  if (token) {
    if (type === 'token') {
      const user = await User.findOne({ apikey: token });
      if (user) {
        req.user = user;
      } else {
        req.user = null;
      }
      return next();
    }

    // bearer
    // 1. decode
    // 2. lookup
    // 3. validate

    const decoded = jwt.decode(token);

    if (!decoded) {
      return next();
    }

    const user = await User.findOne({ id: decoded.id });

    if (!user) {
      req.user = null;
      return next();
    }

    try {
      jwt.verify(token, user.apikey); // if jwt has expired, it will throw
      req.user = user;
    } catch (e) {
      return res.status(401).json(401);
    }
  }

  next();
});

router.get('/', authRequired, (req, res) => res.json(req.user.toObject()));

router.put('/', authRequired, async (req, res) => {
  await req.user.update(req.body).save();
  res.status(200).json(true);
});

router.post('/', async (req, res) => {
  const username = makeUsername(req.body.username);
  if (await find(username)) {
    return res.status(406).json(406); // not accepted
  }

  const user = await new User({
    password: 'let me in',
    ...req.body,
    username,
    token: Date.now().toString(),
  }).save();
  res.status(201).json(user.toObject());
});
