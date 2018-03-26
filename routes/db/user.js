const db = require('./index');
const uuid = require('uuid').v4;
const jwt = require('jsonwebtoken');

const unique = 'id';

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

  bearer(expiresIn = '1 hour') {
    const { username, id, avatar } = this;
    return jwt.sign({ username, id, avatar }, this.apikey, { expiresIn });
  }

  toObject() {
    return this._store.value();
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

    if (this._store) {
      this._store = this._store.assign(props);
      this._store.write();
    } else {
      if (await User.findOne({ [unique]: props[unique] })) {
        return Promise.reject(new Error('DUPLICATE_ENTRY'));
      }

      const data = { id: uuid(), ...props, apikey: uuid() };
      db
        .get('users')
        .push(data)
        .write();

      this._store = db.get('users').find(data);

      this.update(this._store.value());
    }

    return Promise.resolve(this);
  }
}

module.exports = User;
