const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { register, login, getMe, logout } = require('../controller/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.post('/logout', authMiddleware, logout);

module.exports = router;