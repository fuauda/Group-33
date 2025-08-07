const Blog = require('../models/Blog');

// Create a new blog post
exports.createBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id, 
    });

    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all blog posts
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', ['username', 'email']);
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single blog post by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', ['username', 'email']);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update a blog post
exports.updateBlog = async (req, res) => {
  const { title, content } = req.body;

  // Build blog object
  const blogFields = {};
  if (title) blogFields.title = title;
  if (content) blogFields.content = content;

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ msg: 'Blog post not found' });

    // Check user
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: blogFields },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a blog post
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }

    // Check user
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Blog post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.status(500).send('Server Error');
  }
};