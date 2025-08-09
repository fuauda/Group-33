const Report = require('../models/Report');
const { validationResult } = require('express-validator');


exports.createReport = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, categories = [], tags = [] } = req.body;
    
    // Get image paths if uploaded
    const images = req.files ? req.files.map(file => file.path) : [];

    const report = new Report({
      userId: req.user.id,
      title,
      content,
      images,
      categories: Array.isArray(categories) ? categories : [categories],
      tags: Array.isArray(tags) ? tags : [tags],
    });

    await report.save();
    
    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while creating report'
    });
  }
};

exports.getReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    
    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }
    
    // Filter by user
    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    
    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }
    
    // Filter by category
    if (req.query.category) {
      query.categories = req.query.category.toLowerCase();
    }
    
    // Filter by tag
    if (req.query.tag) {
      query.tags = req.query.tag.toLowerCase();
    }
    
    const [reports, total] = await Promise.all([
      Report.find(query)
        .populate('userId', 'username email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Report.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      count: reports.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching reports'
    });
  }
};

exports.getReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('userId', 'username email')
      .populate('likes', 'username');
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }
    
    // Increment view count
    await report.incrementViewCount();
    
    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching report'
    });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    let report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }
    
    // Check if user owns the report or is admin
    if (report.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update this report'
      });
    }
    
    const { title, content, categories, tags, status } = req.body;
    
    // Update fields
    if (title) report.title = title;
    if (content) report.content = content;
    
    // Update arrays if provided
    if (categories) {
      report.categories = Array.isArray(categories) ? categories : [categories];
    }
    
    if (tags) {
      report.tags = Array.isArray(tags) ? tags : [tags];
    }
    
    // Only allow status update for admins
    if (status && req.user.role === 'admin') {
      report.status = status;
    }
    
    // Handle new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      report.images = [...report.images, ...newImages];
    }
    
    await report.save();
    
    res.json({
      success: true,
      data: report
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating report'
    });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }
    
    // Check if user owns the report or is admin
    if (report.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to delete this report'
      });
    }
    
    // TODO: Delete associated images from storage
    
    await report.deleteOne();
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting report'
    });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        error: 'Report not found'
      });
    }
    
    const userId = req.user.id;
    const likeIndex = report.likes.indexOf(userId);
    
    if (likeIndex === -1) {
      // Like the report
      report.likes.push(userId);
      await report.save();
      
      return res.json({
        success: true,
        message: 'Report liked',
        liked: true,
        likeCount: report.likes.length
      });
    } else {
      // Unlike the report
      report.likes.splice(likeIndex, 1);
      await report.save();
      
      return res.json({
        success: true,
        message: 'Report unliked',
        liked: false,
        likeCount: report.likes.length
      });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while toggling like'
    });
  }
};