const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
  toggleLike
} = require('../controller/reportController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/reports';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Generate a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, jpeg, png, gif)'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit per file
}).array('images', 10); // Allow up to 10 files with field name 'images'

// Middleware to handle file upload errors
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        success: false, 
        error: 'File size too large. Maximum size is 5MB per file.'
      });
    }
    return res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  } else if (err) {
    // An unknown error occurred
    return res.status(400).json({ 
      success: false, 
      error: err.message 
    });
  }
  // No errors, proceed to next middleware
  next();
};

// Validation middleware
const validateReport = [
  check('title', 'Title is required').not().isEmpty().trim().escape(),
  check('content', 'Content is required').not().isEmpty().trim().escape(),
  check('categories', 'Categories must be an array').optional().isArray(),
  check('tags', 'Tags must be an array').optional().isArray(),
  check('status')
    .optional()
    .isIn(['pending', 'published', 'rejected'])
    .withMessage('Invalid status value')
];


router.post(
  '/',
  verifyToken,
  (req, res, next) => {
    upload(req, res, function(err) {
      if (err) {
        return handleUploadErrors(err, req, res, next);
      }
      next();
    });
  },
  validateReport,
  createReport
);

router.get(
  '/',
  verifyToken,
  isAdmin,
  [
    check('page', 'Page must be a number').optional().isInt({ min: 1 }),
    check('limit', 'Limit must be a number between 1 and 100').optional().isInt({ min: 1, max: 100 }),
    check('status').optional().isIn(['pending', 'published', 'rejected']),
    check('userId').optional().isMongoId(),
    check('category').optional().trim().escape(),
    check('tag').optional().trim().escape(),
    check('search').optional().trim().escape()
  ],
  getReports
);

router.get(
  '/:id',
  verifyToken,
  isAdmin,
  [
    check('id', 'Invalid report ID').isMongoId()
  ],
  getReport
);


router.put(
  '/:id',
  verifyToken,
  isAdmin,
  (req, res, next) => {
    upload(req, res, function(err) {
      if (err) {
        return handleUploadErrors(err, req, res, next);
      }
      next();
    });
  },
  [
    check('id', 'Invalid report ID').isMongoId(),
    ...validateReport
  ],
  updateReport
);

router.delete(
  '/:id',
  [
    verifyToken,
    isAdmin,
    check('id', 'Invalid report ID').isMongoId()
  ],
  deleteReport
);


router.post(
  '/:id/like',
  [
    verifyToken,
    check('id', 'Invalid report ID').isMongoId()
  ],
  toggleLike
);

module.exports = router;
