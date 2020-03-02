const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route     POST api/users/registeradmin
// @desc      Regiter a admin user
// @access    Public
router.post(
  '/registeradmin',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('role', 'Admin role must be 0')
      .equals('0')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 4 or more characters'
    ).isLength({ min: 4 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, role, password } = req.body;

    try {
      // Limit number of admin
      let user = await User.find({ role: 0 });

      if (user.length >= 1) {
        return res
          .status(400)
          .json({ msg: 'Admin exists. Only 1 Admin allowed' });
      }

      user = new User({
        name,
        email,
        role,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

// @route     POST api/users/registercustomer
// @desc      Regiter a customer user
// @access    Public
router.post(
  '/registercustomer',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('role', 'Customer role must be 1')
      .equals('1')
      .not()
      .isEmpty(),
    check('address', 'Please add delivery address')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, role, address } = req.body;

    try {
      // Because this is demo, so skip customer registeration for fase demonstration
      let user = await User.findOne({ email });

      if (user) {
        // res.status(400).json({ msg: 'Email already exists' });
        await User.deleteOne({ email });
      }

      user = new User({
        name,
        email,
        role,
        address
      });

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
