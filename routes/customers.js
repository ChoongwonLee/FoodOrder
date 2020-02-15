const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Admin = require('../models/Admin');
const Customer = require('../models/Customer');

// @route     POST api/customers
// @desc      Create customer
// @access    Public
router.post(
  '/',
  [
    check('firstName', 'Please add your first name')
      .not()
      .isEmpty(),
    check('lastName', 'Please add your last name')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email } = req.body;
    try {
      const customer = await new Customer({
        firstName,
        lastName,
        email
      });

      await customer.save();

      // Generate web token
      const payload = {
        customer: {
          id: customer.id
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
          res.json({
            customer: {
              id: customer.id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              email: customer.email,
              token
            }
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err });
    }
  }
);

// @route     GET api/customers
// @desc      GET all customers
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (admin) {
      const customers = await Customer.find();
      res.json(customers);
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

// @route     GET api/customers
// @desc      GET individual customer
// @access    Private
router.get('/:id', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (admin) {
      const customer = await Customer.findById(req.params.id);
      res.json(customer);
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

// @route     DELETE api/customers
// @desc      Delte customer
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) return res.stats(404).json({ msg: 'Customer not found' });

    // Make sure customer owns menu
    const admin = await Admin.findById(req.admin.id);
    if (admin) {
      await Customer.findByIdAndRemove(req.params.id);
      res.json({ msg: 'Customer removed' });
    } else {
      return res
        .status(401)
        .json({ msg: 'Only registered admin can delete customer!' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
