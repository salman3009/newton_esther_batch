const router = require('express').Router();
const User = require('../models/userModel');
const mongoose = require('mongoose');

router.post('/user', async (req, res) => {
  const userData = req.body;
  try {
    User.create(userData)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ message: 'Error creating user' });
      });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle validation errors
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      res.status(400).json({ errors });
    } else {
      // Handle other errors
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
});

module.exports = router;
