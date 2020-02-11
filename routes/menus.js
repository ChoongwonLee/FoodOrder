const express = require('express');
const router = express.Router();

// @route     POST api/menus
// @desc      Add new menu
// @access Private
router.post('/', (req, res) => {
  res.send('Add menu');
});

// @route     GET api/menus
// @desc      Get all menus
// @access Public
router.get('/', (req, res) => {
  res.send('Get all menus');
});

// @route     PUT api/menus
// @desc      Update menu
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update menu');
});

// @route     DELETE api/menus
// @desc      Delte menu
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete menu');
});

module.exports = router;
