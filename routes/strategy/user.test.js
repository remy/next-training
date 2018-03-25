console.log('\033c'); // cls
const User = require('./User');
const db = require('../db');

async function main() {
  const user = await User.findOrCreate(
    {
      username: 'rem',
    },
    {
      username: 'rem',
      location: 'brighton',
    }
  );

  user.updated = new Date().toJSON();

  await user.save();

  console.log(await User.findOne({ username: 'rem' }));
}

try {
  main();
} catch (e) {
  console.log(e);
}
