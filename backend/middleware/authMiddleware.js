const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../models/BlacklistedToken');

module.exports = async function (req, res, next) {
  
  const token = req.header('x-auth-token');

 
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const blacklistedToken = await BlacklistedToken.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ msg: 'Token is blacklisted, please log in again' });
    }

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};