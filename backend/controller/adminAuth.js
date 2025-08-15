const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const InviteCode = require('../models/InviteCode');
const { validationResult } = require('express-validator');
const { validateInviteCode } = require('./inviteController');

// Admin registration with invite code
exports.registerAdmin = async (req, res) => {
  const { inviteCode, name, email, username, password } = req.body;
  
  // Validate input
  const errors = [];
  if (!inviteCode) errors.push('Invite code is required');
  if (!name) errors.push('Name is required');
  if (!email) errors.push('Email is required');
  if (!username) errors.push('Username is required');
  if (!password) errors.push('Password is required');
  
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }
  
  try {
    // Validate invite code
    const { isValid, inviteCode: code } = await validateInviteCode(inviteCode);
    
    if (!isValid || !code) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired invite code'
      });
    }
    
    // Check if email or username already exists
    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }]
    });

    if (existingAdmin) {
      const errors = {};
      if (existingAdmin.email === email) errors.email = 'Email already in use';
      if (existingAdmin.username === username) errors.username = 'Username already taken';
      return res.status(400).json({ success: false, errors });
    }

    // Create new admin
    const admin = new Admin({
      name,
      email,
      username,
      password, // Password will be hashed by pre-save hook
      role: 'admin',
      inviteCode: code._id // Store reference to the used invite code
    });
    
    // Save the admin first to get the _id
    await admin.save();
    
    // Mark invite code as used
    await code.markAsUsed(admin._id);

    // Don't send password back
    admin.password = undefined;

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server error during admin registration' 
    });
  }
};

// Admin login with username or invite code
exports.loginAdmin = async (req, res) => {
  const { identifier, password } = req.body;
  
  if (!identifier) {
    return res.status(400).json({
      success: false,
      error: 'Username or invite code is required'
    });
  }

  try {
    // Find admin by username or invite code
    let admin;
    
    // Check if identifier is a valid invite code (6 alphanumeric characters)
    if (/^[A-Z0-9]{6}$/i.test(identifier)) {
      // Find admin by invite code
      const inviteCode = await InviteCode.findOne({
        code: identifier.toUpperCase(),
        usedBy: { $exists: true }
      }).populate('usedBy');
      
      if (!inviteCode || !inviteCode.usedBy) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
      
      admin = inviteCode.usedBy;
      // Get the full admin document with password
      admin = await Admin.findById(admin._id).select('+password');
    } else {
      // Find by username
      admin = await Admin.findOne({ username: identifier }).select('+password');
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Create JWT payload
    const payload = {
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token: `Bearer ${token}`
        });
      }
    );
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error during admin login'
    });
  }
};

// Get current admin profile
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    res.json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};
