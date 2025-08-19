const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { submitIssueReport } = require('../controller/issueReportController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join('uploads', 'issue-reports');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb(new Error('Only image files are allowed (jpg, jpeg, png, gif)'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).array('photos', 10);

// Validation rules
const validateIssueReport = [
  check('name').trim().notEmpty().withMessage('Full Name is required'),
  check('email').trim().isEmail().withMessage('Valid Email Address is required'),
  check('phone').trim().notEmpty().withMessage('Phone Number is required'),
  check('issueType').trim().notEmpty().withMessage('Issue Type is required'),
  check('urgency').trim().notEmpty().withMessage('Urgency Level is required'),
  check('location').trim().notEmpty().withMessage('Issue Location is required'),
  check('description').trim().notEmpty().withMessage('Issue Description is required'),
  check('additionalInfo').optional().trim()
];

// POST /api/issues/report
router.post('/report', (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, error: 'File size too large. Maximum size is 5MB per file.' });
      }
      return res.status(400).json({ success: false, error: err.message });
    }
    next();
  });
}, validateIssueReport, submitIssueReport);

module.exports = router;

