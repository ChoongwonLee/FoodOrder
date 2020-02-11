const express = require('express');
const router = express.Router();

// @route     POST api/orders
// @desc      Add new order from menus
// @access Private
router.post('/', (req, res) => {
  res.send('Add order');
});

// @route     GET api/orders
// @desc      Get all orders
// @access Public
router.get('/', (req, res) => {
  res.send('Get all orders');
});

// @route     PUT api/orders
// @desc      Update order
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update order');
});

// @route     DELETE api/orders
// @desc      Delte order
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete order');
});

module.exports = router;
