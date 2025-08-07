const mongoose = require('mongoose');

const inviteCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 6
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  usedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  usedAt: {
    type: Date,
    default: null
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 77*24*60*60*1000), 
    index: { expires: 0 } 
  },
  status: {
    type: String,
    enum: ['active', 'used', 'expired'],
    default: 'active'
  }
}, {
  timestamps: true
});

inviteCodeSchema.index({ code: 1, status: 1 });

inviteCodeSchema.pre('save', function(next) {
  if (this.isModified('code')) {
    this.code = this.code.toUpperCase();
  }
  next();
});

inviteCodeSchema.statics.generateCode = function() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

  inviteCodeSchema.methods.isValid = function() {
  return this.status === 'active' && new Date() < this.expiresAt;
};
inviteCodeSchema.methods.markAsUsed = async function(adminId) {
  this.usedBy = adminId;
  this.usedAt = new Date();
  this.status = 'used';
  return this.save();
};

inviteCodeSchema.statics.updateExpired = async function() {
  return this.updateMany(
    {
      status: 'active',
      expiresAt: { $lt: new Date() }
    },
    { $set: { status: 'expired' } }
  );
};

inviteCodeSchema.index({ code: 1, status: 1 }, { unique: true, partialFilterExpression: { status: 'active' } });

const InviteCode = mongoose.model('InviteCode', inviteCodeSchema);

module.exports = InviteCode;
