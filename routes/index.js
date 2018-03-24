const express = require('express');
const router = express.Router();
const data = require('../mock-api/db.json');

module.exports = router;

router.get('/schedule', (req, res) => {
  res.json(data.schedule);
});

router.get('/schedule/:slug', (req, res) => {
  res.json(data.schedule.find(s => s.slug === req.params.slug));
});
