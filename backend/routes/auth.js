const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'HimanshuSoftwareDeveloper';

// Create User using POST "/api/auth/createuser"
router.post(
  '/createuser',
  [
    // 1. CUSTOM VALIDATOR for Name
    body('name').custom((value, { req }) => {
      if (value.length < 3) {
        throw new Error('Name must be greater than 3 characters.');
      }
      return true;
    }),

    // 2. Built-in validator for Email
    body('email', 'Enter a valid email').isEmail(),

    // 3. CUSTOM VALIDATOR for Password
    body('password').custom((value, { req }) => {
      if (value.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }
      return true;
    }),
  ],
  async (req, res) => {
    // Check for validation errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Essential try-catch block for database errors
    try {
      // Check if user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // HTTP 400 Bad Request
        return res
          .status(400)
          .json({ error: 'User with this email already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create the new user
      user = await User.create({
        name: req.body.name,
        password: secPass, // IMPORTANT: Remember to hash the password in a real app!
        email: req.body.email,
      });

      // HTTP 200 OK (or 201 Created)
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      // HTTP 500 Internal Server Error (for DB or server issues)
      res.status(500).send('Internal Server Error: Could not process request.');
    }
  }
);

//Authenticate a User  using : POST "/api/auth/login"
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user)
        return res.status(400).json('Try to login with correct credentials');
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare)
        return res.status(400).json('Try to login with correct credentials');
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      // HTTP 500 Internal Server Error (for DB or server issues)
      res.status(500).send('Internal Server Error: Could not process request.');
    }
  }
);

module.exports = router;
