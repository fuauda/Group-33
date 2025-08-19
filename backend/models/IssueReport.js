const mongoose = require('mongoose');

const issueReportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [200, 'Name cannot exceed 200 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    issueType: {
      type: String,
      required: [true, 'Issue type is required'],
      trim: true
    },
    urgency: {
      type: String,
      required: [true, 'Urgency level is required'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Issue location is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Issue description is required'],
      trim: true
    },
    photos: [
      {
        type: String,
        trim: true
      }
    ],
    additionalInfo: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['submitted', 'in_review', 'resolved', 'rejected'],
      default: 'submitted'
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('IssueReport', issueReportSchema);

