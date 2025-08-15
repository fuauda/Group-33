const InviteCode = require('../models/InviteCode');
const Admin = require('../models/Admin');

// Generate a new invite code (SuperAdmin only)
exports.generateInviteCode = async (req, res) => {
  try {
    // Check if user is superadmin
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        error: 'Only superadmins can generate invite codes'
      });
    }

    let code;
    let codeExists = true;
    
    // Generate a unique code
    while (codeExists) {
      code = InviteCode.generateCode();
      // Check if code already exists and is active
      const existingCode = await InviteCode.findOne({ 
        code,
        status: 'active',
        expiresAt: { $gt: new Date() }
      });
      
      if (!existingCode) {
        codeExists = false;
      }
    }

    // Create new invite code
    const inviteCode = new InviteCode({
      code,
      createdBy: req.admin.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    });

    await inviteCode.save();

    res.status(201).json({
      success: true,
      code: inviteCode.code, 
      expiresAt: inviteCode.expiresAt
    });
  } catch (error) {
    console.error('Error generating invite code:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while generating invite code'
    });
  }
};

exports.listInviteCodes = async (req, res) => {
  try {
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        error: 'Only superadmins can view invite codes'
      });
    }

    const inviteCodes = await InviteCode.find()
      .populate('createdBy', 'username email')
      .populate('usedBy', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: inviteCodes.length,
      data: inviteCodes
    });
  } catch (error) {
    console.error('Error listing invite codes:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching invite codes'
    });
  }
};

// Revoke an invite code (SuperAdmin only)
exports.revokeInviteCode = async (req, res) => {
  try {
    if (req.admin.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        error: 'Only superadmins can revoke invite codes'
      });
    }

    const { codeId } = req.params;

    const inviteCode = await InviteCode.findById(codeId);
    
    if (!inviteCode) {
      return res.status(404).json({
        success: false,
        error: 'Invite code not found'
      });
    }

    if (inviteCode.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: 'Only active invite codes can be revoked'
      });
    }

    inviteCode.status = 'expired';
    await inviteCode.save();

    res.json({
      success: true,
      message: 'Invite code revoked successfully'
    });
  } catch (error) {
    console.error('Error revoking invite code:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while revoking invite code'
    });
  }
};

// Validate an invite code (used during registration)
exports.validateInviteCode = async (code) => {
  try {
    
    await InviteCode.updateExpired();

    const inviteCode = await InviteCode.findOne({
      code: code.toUpperCase(),
      status: 'active',
      expiresAt: { $gt: new Date() }
    });

    return {
      isValid: !!inviteCode,
      inviteCode
    };
  } catch (error) {
    console.error('Error validating invite code:', error);
    return { isValid: false };
  }
};
