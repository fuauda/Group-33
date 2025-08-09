const mongoose = require('mongoose');

const moderationReportSchema = new mongoose.Schema({
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reportedContentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // This will reference different models depending on the contentType
        refPath: 'reportedContentType'
    },
    reportedContentType: {
        type: String,
        required: true,
        enum: ['Blog', 'Comment', 'Event'] // Add other content types as needed
    },
    reason: {
        type: String,
        required: [true, 'A reason for the report is required.'],
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'resolved', 'dismissed'],
        default: 'pending'
    },
    adminNotes: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const ModerationReport = mongoose.model('ModerationReport', moderationReportSchema);

module.exports = ModerationReport;
