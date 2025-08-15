const express = require('express');
const router = express.Router();

const userController = require('../controller/user');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);

module.exports = router;