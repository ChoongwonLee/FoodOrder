const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// @route     POST api/admin
// @desc      Register admin
// @access Public
router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
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

    const { name, email, password } = req.body;

    try {
      let admin = await Admin.findOne({ email });

      if (admin) {
        return res.status(400).json({ msg: 'admin already exists' });
      }

      admin = new Admin({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const payload = {
        admin: {
          id: admin.id
        }
      };
      // Generate jwt token
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err });
    }
  }
);

module.exports = router;
