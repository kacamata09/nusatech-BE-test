const jwt = require('jsonwebtoken');
const helper = require('../helpers/responseHelper');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return helper.error(res, 'Authentication required', 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return helper.error(res, 'Invalid token', 401);
  }
};
