const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const blogController = require('../controller/blog');

router.post('/', auth, blogController.createBlog);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', auth, blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;