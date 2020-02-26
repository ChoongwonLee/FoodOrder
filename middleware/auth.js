const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ mgs: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // assign decoded user to request user
    req.user = decoded.user;
    // move to next
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
