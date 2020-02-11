const express = require('express');
const router = express.Router();

// @route     POST api/guest
// @desc      Create customer
// @access Public
router.post('/', (req, res) => {
  res.send('Register customer');
});

module.exports = router;
