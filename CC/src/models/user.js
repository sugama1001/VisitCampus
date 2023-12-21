const db = require('../config/database.js');

const User = {
  createUser: (name, email, password, callback) => {
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
      callback
    );
  },
  getUserByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },
};

module.exports = User;