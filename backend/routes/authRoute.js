const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

const { register, login, getMe, logout } = require('../controller/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);
router.post('/logout', verifyToken, logout);

module.exports = router;