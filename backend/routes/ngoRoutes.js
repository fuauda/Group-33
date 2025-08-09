const express = require('express');
const router = express.Router();
const { 
  createNGO, 
  getApprovedNGOs, 
  getNGOById, 
  updateNGO, 
  deleteNGO, 
  updateNGOStatus, 
  getPendingNGOs 
} = require('../controller/ngoController');
const { 
  validateCreateNGO, 
  validateUpdateNGO, 
  validateNGOStatus, 
  validateQueryParams 
} = require('../validators/ngoValidator');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Public routes
router.get('/', validateQueryParams, getApprovedNGOs);
router.get('/:id', getNGOById);

// Protected routes (require authentication)
router.post('/', verifyToken, validateCreateNGO, createNGO);
router.put('/:id', verifyToken, validateUpdateNGO, updateNGO);

// Admin-only routes
router.get('/admin/pending', verifyToken, isAdmin, validateQueryParams, getPendingNGOs);
router.put('/admin/:id/status', verifyToken, isAdmin, validateNGOStatus, updateNGOStatus);
router.delete('/:id', verifyToken, isAdmin, deleteNGO);

module.exports = router;
