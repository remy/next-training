const cors = require('cors');
module.exports = cors({
  origin: true,
  credentials: true,
  allowedHeaders: [
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
  ],
});
