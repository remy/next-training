const express = require('express');
const router = express.Router();
const auth = require('./auth');
const data = require('../mock-api/db.json');
const cors = require('./cors');

module.exports = router;

router.options('/*', (req, res) => {
  res.status(204).send('');
});

router.use(cors);

router.use(auth);

router.use('/user', require('./user'));
router.get('/schedule', (req, res) => {
  res.json(data.schedule);
});

router.get('/schedule/:slug', (req, res) => {
  res.json(data.schedule.find(s => s.slug === req.params.slug));
});
