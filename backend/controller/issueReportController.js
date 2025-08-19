const { validationResult } = require('express-validator');
const IssueReport = require('../models/IssueReport');

exports.submitIssueReport = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      issueType,
      urgency,
      location,
      description,
      additionalInfo
    } = req.body;

    const photos = Array.isArray(req.files) && req.files.length > 0
      ? req.files.map((f) => f.path)
      : [];

    const report = await IssueReport.create({
      name,
      email,
      phone,
      issueType,
      urgency,
      location,
      description,
      additionalInfo,
      photos
    });

    return res.status(201).json({ success: true, data: report, message: 'Issue report submitted successfully' });
  } catch (err) {
    console.error('Error submitting issue report:', err);
    return res.status(500).json({ success: false, error: 'Server error while submitting issue report' });
  }
};

