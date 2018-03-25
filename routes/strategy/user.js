const db = require('../db');
const uuid = require('uuid').v4;

const unique = 'username';

class User {
  constructor(props) {
    Object.assign(this, props);
    this._store = null;
  }

  static findOne(key) {
    const user = db.get('users').find(key);

    if (!user.value()) {
      return Promise.resolve(null);
    }

    const u = new User(user.value());
    u._store = user;

    return Promise.resolve(u);
  }

  static async findOrCreate(key, values) {
    const user = await User.findOne(key);

    if (!user) {
      return new User(values).save();
    }

    return user;
  }

  update(values) {
    Object.assign(this, values);
    return this;
  }

  async save() {
    const props = Object.getOwnPropertyNames(this).reduce((acc, curr) => {
      if (!curr.startsWith('_')) {
        acc[curr] = this[curr];
      }
      return acc;
    }, {});

    console.log('props', props);

    if (this._store) {
      this._store.assign(props).write();
    } else {
      if (await User.findOne({ [unique]: props[unique] })) {
        return Promise.reject(new Error('DUPLICATE_ENTRY'));
      }
      this._store = db
        .get('users')
        .push({ id: uuid(), ...props })
        .write()
        .last();
    }

    return Promise.resolve(this);
  }
}

module.exports = User;
