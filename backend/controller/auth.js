const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Validation function for registration
const validateRegistration = (data) => {
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    zipCode,
    username,
    password,
    confirmPassword
  } = data;

  const errors = [];

  // Required fields check
  if (!firstName) errors.push('First name is required');
  if (!lastName) errors.push('Last name is required');
  if (!email) errors.push('Email is required');
  if (!address) errors.push('Street address is required');
  if (!city) errors.push('City is required');
  if (!zipCode) errors.push('ZIP code is required');
  if (!username) errors.push('Username is required');
  if (!password) errors.push('Password is required');
  if (!confirmPassword) errors.push('Please confirm your password');

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  // Password validation
  if (password && password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // Password confirmation
  if (password && confirmPassword && password !== confirmPassword) {
    errors.push('Passwords do not match');
  }

  // Username validation
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (username && !usernameRegex.test(username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    zipCode,
    username,
    password,
    confirmPassword
  } = req.body;

  // Validate input
  const { isValid, errors } = validateRegistration(req.body);
  if (!isValid) {
    return res.status(400).json({ errors });
  }

  try {
    // Check if user with email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      const errors = [];
      if (existingUser.email === email) errors.push('Email already in use');
      if (existingUser.username === username) errors.push('Username already taken');
      return res.status(400).json({ errors });
    }

    // Create new user with address
    const user = new User({
      firstName,
      lastName,
      email,
      address: {
        street: address,
        city,
        zipCode
      },
      username,
      password // Password will be hashed by pre-save hook
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const BlacklistedToken = require('../models/BlacklistedToken');

exports.logout = async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(400).json({ msg: 'No token provided' });
    }


    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return res.status(400).json({ msg: 'Invalid token format' });
    }

    const expiresAt = new Date(decoded.exp * 1000); 

    const blacklistedToken = new BlacklistedToken({
      token,
      expiresAt,
    });

    await blacklistedToken.save();

    res.json({ msg: 'Logged out successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};