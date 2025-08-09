const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/auth');
const blogController = require('../controller/blog');

router.post('/', verifyToken, blogController.createBlog);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', verifyToken, blogController.updateBlog);
router.delete('/:id', verifyToken, blogController.deleteBlog);

module.exports = router;