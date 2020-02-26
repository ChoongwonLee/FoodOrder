const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route     GET api/customers
// @desc      GET all customers
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      const customers = await User.find({ role: 1 });
      res.json(customers);
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// @route     GET api/customers
// @desc      GET individual customer
// @access    Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      const customer = await User.findById(req.params.id);
      res.json(customer);
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route     DELETE api/customers
// @desc      Delte customer
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let customer = await User.findById(req.params.id);

    if (!customer) return res.stats(404).json({ msg: 'Customer not found' });

    // Make sure customer owns menu
    const user = await User.findById(req.user.id);
    if (user) {
      await User.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Customer removed' });
    } else {
      return res
        .status(401)
        .json({ msg: 'Only registered admin can delete customer!' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
