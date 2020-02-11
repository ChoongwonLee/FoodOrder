const express = require('express');
const router = express.Router();

// @route     GET api/auth
// @desc      GET logged in admin
// @access Private
router.get('/', (req, res) => {
  res.send('Get logged in admin');
});

// @route     GET api/auth
// @desc      Auth admin & get token
// @access Public
router.post('/', (req, res) => {
  res.send('Login in admin');
});

module.exports = router;
