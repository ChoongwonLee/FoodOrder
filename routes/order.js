const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Menus = require('../models/Menus');
// const Customer = require('../models/Customer');
// const Admin = require('../models/Admin');
const User = require('../models/User');

// @route     POST api/orders/:menuId
// @desc      Add new order from menus
// @access    Private
router.post('/:menuId', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const menus = await Menus.findById(req.params.menuId);
    if (!menus) {
      return res.status(404).json({ msg: 'menu not found!' });
    }

    const customer = await User.findById(req.user.id);
    if (customer) {
      const newOrder = new Order({
        user: req.user.id,
        menus: req.params.menuId,
        customer: customer.name,
        menuTitle: menus.title,
        address: customer.address,
        quantity: req.body.quantity
      });

      const order = await newOrder.save();

      res.status(201).json({ order });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// @route     GET api/orders
// @desc      Get customer order
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

// @route     PUT api/orders
// @desc      Update order
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { address, quantity } = req.body;

  const orderFields = {};
  if (address) orderFields.address = address;
  if (quantity) orderFields.quantity = quantity;

  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: 'Order not found!' });

    // Make sure customer owns menu
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: orderFields },
      { new: true }
    );

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
});

// @route     DELETE api/orders
// @desc      Delte order
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: 'Order not found' });

    // Make sure customer owns menu
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Order.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

// @route     GET api/orders
// @desc      GET all orders for admin
// @access    Private
router.get('/adminorders', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      const orders = await Order.find();
      res.json(orders);
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

// @route     GET api/orders
// @desc      GET individual order for admin
// @access    Private
router.get('/adminorders/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      const order = await Order.findById(req.params.id);
      res.json(order);
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
