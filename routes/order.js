const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Menus = require('../models/Menus');
const Customer = require('../models/Customer');

// @route     POST api/orders
// @desc      Add new order from menus
// @access    Private
router.post(
  '/',
  [
    auth,
    check('address', 'Please add delivery address')
      .not()
      .isEmpty(),
    check('quantity', 'Please add quantity')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, address, quantity } = req.body;

    try {
      const newOrder = new Order({
        customer: req.customer.id,
        menus: req.body.menusId,
        date,
        address,
        quantity
      });

      const order = await newOrder.save();

      res.status(201).json({ order });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  }
);

// @route     GET api/orders
// @desc      Get customer order
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.customer.id }).sort({
      date: -1
    });
    res.json({ orders, customer: req.customer.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

// @route     PUT api/orders
// @desc      Update order
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update order');
});

// @route     DELETE api/orders
// @desc      Delte order
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.stats(404).json({ msg: 'Order not found' });

    // Make sure customer owns menu
    if (order.customer.toString() !== req.customer.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Order.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
