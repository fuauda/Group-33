const ModerationReport = require('../models/moderationReportModel');
const User = require('../models/User');
const Blog = require('../models/Blog');

// @desc    Create a new moderation report
// @route   POST /api/moderation-reports
// @access  Private (Authenticated Users)
const createModerationReport = async (req, res) => {
    const { reportedContentId, reportedContentType, reason } = req.body;
    const reportedBy = req.user.id;

    if (!reportedContentId || !reportedContentType || !reason) {
        return res.status(400).json({ success: false, error: 'Missing required fields.' });
    }

    try {
        // Optional: Check if the content being reported actually exists (support Blog only for now)
        const modelMap = { Blog };
        const contentModel = modelMap[reportedContentType];
        if (!contentModel) {
            return res.status(400).json({ success: false, error: `Unsupported content type: ${reportedContentType}` });
        }
        const contentExists = await contentModel.findById(reportedContentId);
        if (!contentExists) {
            return res.status(404).json({ success: false, error: `${reportedContentType} not found.` });
        }

        const report = new ModerationReport({
            reportedBy,
            reportedContentId,
            reportedContentType,
            reason
        });

        await report.save();
        res.status(201).json({ success: true, data: report });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error while creating report.' });
    }
};

// @desc    Get all moderation reports
// @route   GET /api/admin/moderation-reports
// @access  Private (Admin only)
const getModerationReports = async (req, res) => {
    try {
        const reports = await ModerationReport.find().populate('reportedBy', 'name email').populate('reportedContentId');
        res.status(200).json({ success: true, data: reports });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error while fetching reports.' });
    }
};

// @desc    Update a report's status and take action
// @route   PUT /api/admin/moderation-reports/:id
// @access  Private (Admin only)
const updateModerationReport = async (req, res) => {
    const { status, adminNotes, action } = req.body; // action can be 'remove_content' or 'ban_user'

    try {
        const report = await ModerationReport.findById(req.params.id);

        if (!report) {
            return res.status(404).json({ success: false, error: 'Report not found.' });
        }

        report.status = status || report.status;
        report.adminNotes = adminNotes || report.adminNotes;

        if (action === 'remove_content' && report.status === 'resolved') {
            const modelMap = { Blog };
            const contentModel = modelMap[report.reportedContentType];
            if (contentModel) {
                await contentModel.findByIdAndDelete(report.reportedContentId);
            }
        }

        if (action === 'ban_user' && report.status === 'resolved') {
            const modelMap = { Blog };
            const contentModel = modelMap[report.reportedContentType];
            const content = contentModel ? await contentModel.findById(report.reportedContentId) : null;
            if (content && content.author) {
                 await User.findByIdAndUpdate(content.author, { isBanned: true });
            }
        }

        await report.save();
        res.status(200).json({ success: true, data: report });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error while updating report.' });
    }
};

module.exports = {
    createModerationReport,
    getModerationReports,
    updateModerationReport
};
