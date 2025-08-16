const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');
const BlacklistedToken = require('../models/BlacklistedToken');

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
  // Prefer Authorization: Bearer <token>, fallback to x-auth-token
  let token = req.header('authorization') || req.header('Authorization');
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  } else if (!token) {
    token = req.header('x-auth-token');
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No token, authorization denied'
    });
  }

  try {
    // Check blacklist
    const blacklisted = await BlacklistedToken.findOne({ token });
    if (blacklisted) {
      return res.status(401).json({ success: false, error: 'Token is blacklisted, please log in again' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.user) {
      req.user = decoded.user;
    } else if (decoded.admin) {
      req.admin = decoded.admin;
    }

    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ success: false, error: 'Token is not valid' });
  }
};

// Middleware to check if user is admin
exports.isAdmin = async (req, res, next) => {
  try {
    // Check if admin is authenticated
    if (!req.admin) {
      return res.status(403).json({ 
        success: false, 
        error: 'Access denied. Admin privileges required.' 
      });
    }

    // Find admin in database
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin) {
      return res.status(404).json({ 
        success: false, 
        error: 'Admin not found' 
      });
    }

    // Proceed if admin is found
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error during admin verification' 
    });
  }
};

// Middleware to check if user is superadmin
exports.isSuperAdmin = async (req, res, next) => {
  try {
    // Check if admin is authenticated
    if (!req.admin) {
      return res.status(403).json({ 
        success: false, 
        error: 'Access denied. Admin privileges required.' 
      });
    }

    // Find admin in database
    const admin = await Admin.findById(req.admin.id);
    
    if (!admin) {
      return res.status(404).json({ 
        success: false, 
        error: 'Admin not found' 
      });
    }

    // Check if admin is superadmin
    if (admin.role !== 'superadmin') {
      return res.status(403).json({ 
        success: false, 
        error: 'Access denied. Superadmin privileges required.' 
      });
    }

    // Proceed if admin is superadmin
    next();
  } catch (error) {
    console.error('Superadmin check error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error during superadmin verification' 
    });
  }
};
