const express = require('express');
const router = express.Router();
const { 
  generateInviteCode, 
  listInviteCodes, 
  revokeInviteCode 
} = require('../controller/inviteController');
const { verifyToken, isSuperAdmin } = require('../middleware/auth');


router.post(
  '/generate',
  verifyToken,
  isSuperAdmin,
  generateInviteCode
);


router.get(
  '/',
  verifyToken,
  isSuperAdmin,
  listInviteCodes
);


router.delete(
  '/:codeId',
  verifyToken,
  isSuperAdmin,
  revokeInviteCode
);

module.exports = router;
