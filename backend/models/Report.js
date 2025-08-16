const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  images: [{
    type: String, // Will store file paths or URLs
    trim: true
  }],
  status: {
    type: String,
    enum: ['pending', 'published', 'rejected'],
    default: 'pending'
  },
  categories: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  viewCount: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Add text index for search
reportSchema.index({
  title: 'text',
  content: 'text',
  tags: 'text',
  categories: 'text'
});

// Virtual for like count
reportSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Method to increment view count
reportSchema.methods.incrementViewCount = async function() {
  this.viewCount += 1;
  await this.save();
};

// Pre-save hook to ensure arrays are unique
reportSchema.pre('save', function(next) {
  if (this.categories) {
    this.categories = [...new Set(this.categories)];
  }
  if (this.tags) {
    this.tags = [...new Set(this.tags)];
  }
  next();
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;