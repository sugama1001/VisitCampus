const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = 'yourSecretKey'; // Ganti dengan kunci rahasia yang kuat

const UserController = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      User.createUser(name, email, hashedPassword, (err, newUser) => {
        if (err) {
          res.status(500).json({ error: 'Internal server error' });
        } else {
          const { createdAt, updatedAt } = newUser; // Sesuaikan dengan atribut yang sesuai
          res.status(201).json({
            message: 'User created successfully',
            user: {
              createdAt,
              updatedAt,
              name,
              email,
              password: hashedPassword // Ini sebaiknya tidak disertakan dalam respons aktual
            }
          });
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;

    User.getUserByEmail(email, async (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else if (results.length === 0) {
        res.status(401).json({ error: 'Email or password is incorrect' });
      } else {
        const match = await bcrypt.compare(password, results[0].password);
        if (match) {
          const userId = results[0].id;
          const userEmail = results[0].email;
          const userName = results[0].name;

          // Membuat token JWT
          const token = jwt.sign({ userId, userEmail, userName }, secretKey, { expiresIn: '1h' });

          res.status(200).json({
            accessToken: token,
            userId,
            email: userEmail,
            name: userName,
          });
        } else {
          res.status(401).json({ error: 'Email or password is incorrect' });
        }
      }
    });
  },
};

module.exports = UserController;