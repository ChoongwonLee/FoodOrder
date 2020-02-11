const express = require('express');
const router = express.Router();

// @route     POST api/admin
// @desc      Register admin
// @access Public
router.post('/', (req, res) => {
  res.send('Register admin');
});

module.exports = router;
