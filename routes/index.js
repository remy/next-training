const express = require('express');
const router = express.Router();
const data = require('../mock-api/db.json');
const cors = require('./cors');

module.exports = router;

router.options('*', cors);
router.use(cors);

router.get('/schedule', (req, res) => {
  res.json(data.schedule);
});

router.get('/schedule/:slug', (req, res) => {
  res.json(data.schedule.find(s => s.slug === req.params.slug));
});
