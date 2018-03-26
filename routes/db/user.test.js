console.log('\033c'); // cls
const User = require('./User');
const db = require('./index');

db
  .get('users')
  .remove()
  .write();

async function __main() {
  const u = {
    id: 123,
    login: 'rem',
  };

  await User.findOrCreate({ id: u.id }, u);

  const d = db.get('users');

  let s = d.push(u).write();

  s = d.find({ id: u.id });
  s.assign({ name: 'remy' }).write();

  console.log(db.value());

  // store.assign({ other: 'bit ' });
  // store.write();

  console.log(db.get('users').value().length);
}

async function main() {
  const user = await User.findOrCreate(
    {
      id: 123,
    },
    {
      id: 123,
      login: 'rem',
      location: 'brighton',
      newbit: 'ok',
    }
  );

  user.updated = new Date().toJSON();

  await user.save();

  console.log(db.get('users').value());
}

try {
  main();
} catch (e) {
  console.log(e);
}
