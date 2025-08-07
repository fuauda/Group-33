const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { 
  registerAdmin, 
  loginAdmin, 
  getAdminProfile 
} = require('../controller/adminAuth');
const { verifyToken, isAdmin, isSuperAdmin } = require('../middleware/auth');


router.post(
  '/register',
  [
    verifyToken,
    isSuperAdmin,
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 })
  ],
  registerAdmin
);


router.post(
  '/login',
  [
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists()
  ],
  loginAdmin
);


router.get('/me', verifyToken, isAdmin, getAdminProfile);

module.exports = router;
