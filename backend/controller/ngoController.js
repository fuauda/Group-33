const NGO = require('../models/NGO');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError, UnauthorizedError } = require('../utils/errors');

// @desc    Create a new NGO
// @route   POST /api/ngos
// @access  Private
const createNGO = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError('Validation failed', errors.array());
    }

    const { name, mission, description, logoUrl, contact } = req.body;
    
    // Check if user already has an NGO
    const existingNGO = await NGO.findOne({ 'contact.email': contact.email });
    if (existingNGO) {
      throw new BadRequestError('An NGO with this email already exists');
    }

    // Create new NGO
    const ngo = new NGO({
      name,
      mission,
      description,
      logoUrl,
      contact,
      createdBy: req.user.id,
      status: 'pending'
    });

    await ngo.save();

    // Update user's role to NGO and link to this NGO
    await User.findByIdAndUpdate(req.user.id, {
      role: 'ngo',
      ngo: ngo._id
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: ngo
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all approved NGOs (public)
// @route   GET /api/ngos
// @access  Public
const getApprovedNGOs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = { status: 'approved' };

    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const ngos = await NGO.find(query)
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v -status -statusNote -createdBy')
      .lean();

    const count = await NGO.countDocuments(query);

    res.status(StatusCodes.OK).json({
      success: true,
      count: ngos.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      data: ngos
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get NGO by ID (public, but only approved NGOs are visible to guests)
// @route   GET /api/ngos/:id
// @access  Public
const getNGOById = async (req, res, next) => {
  try {
    const ngo = await NGO.findById(req.params.id)
      .select('-__v -createdBy');

    if (!ngo) {
      throw new NotFoundError('NGO not found');
    }

    // Only show pending/rejected NGOs to admins or the NGO owner
    if (ngo.status !== 'approved' && 
        (!req.user || 
         (req.user.role !== 'admin' && 
          ngo.createdBy.toString() !== req.user.id.toString()))) {
      throw new UnauthorizedError('Not authorized to view this NGO');
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: ngo
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update NGO profile
// @route   PUT /api/ngos/:id
// @access  Private (NGO owner or Admin)
const updateNGO = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError('Validation failed', errors.array());
    }

    const { name, mission, description, logoUrl, contact } = req.body;
    const ngo = await NGO.findById(req.params.id);

    if (!ngo) {
      throw new NotFoundError('NGO not found');
    }

    // Check if user is authorized (admin or NGO owner)
    if (req.user.role !== 'admin' && ngo.createdBy.toString() !== req.user.id.toString()) {
      throw new UnauthorizedError('Not authorized to update this NGO');
    }

    // If NGO is not approved, only the admin can update it
    if (ngo.status !== 'approved' && req.user.role !== 'admin') {
      throw new UnauthorizedError('Your NGO is not approved yet');
    }

    // Update fields
    ngo.name = name || ngo.name;
    ngo.mission = mission || ngo.mission;
    ngo.description = description !== undefined ? description : ngo.description;
    ngo.logoUrl = logoUrl || ngo.logoUrl;
    
    if (contact) {
      ngo.contact = { ...ngo.contact, ...contact };
    }

    await ngo.save();

    res.status(StatusCodes.OK).json({
      success: true,
      data: ngo
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete NGO
// @route   DELETE /api/ngos/:id
// @access  Private (Admin only)
const deleteNGO = async (req, res, next) => {
  try {
    const ngo = await NGO.findById(req.params.id);

    if (!ngo) {
      throw new NotFoundError('NGO not found');
    }

    // Only admin can delete NGOs
    if (req.user.role !== 'admin') {
      throw new UnauthorizedError('Not authorized to delete this NGO');
    }

    // Remove NGO reference from associated users
    await User.updateMany(
      { ngo: ngo._id },
      { $unset: { ngo: '' }, $set: { role: 'guest' } }
    );

    await ngo.remove();

    res.status(StatusCodes.OK).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update NGO status (Approve/Reject)
// @route   PUT /api/ngos/:id/status
// @access  Private (Admin only)
const updateNGOStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;
    
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      throw new BadRequestError('Invalid status value');
    }

    const ngo = await NGO.findById(req.params.id);
    
    if (!ngo) {
      throw new NotFoundError('NGO not found');
    }

    // Only admin can update status
    if (req.user.role !== 'admin') {
      throw new UnauthorizedError('Not authorized to update NGO status');
    }

    ngo.status = status;
    ngo.statusNote = note || '';
    await ngo.save();

    // If approved, update all associated users to have NGO role
    if (status === 'approved') {
      await User.updateMany(
        { ngo: ngo._id },
        { $set: { role: 'ngo' } }
      );
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: ngo
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get pending NGOs (Admin only)
// @route   GET /api/ngos/pending
// @access  Private (Admin)
const getPendingNGOs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const ngos = await NGO.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v')
      .lean();

    const count = await NGO.countDocuments({ status: 'pending' });

    res.status(StatusCodes.OK).json({
      success: true,
      count: ngos.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      data: ngos
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNGO,
  getApprovedNGOs,
  getNGOById,
  updateNGO,
  deleteNGO,
  updateNGOStatus,
  getPendingNGOs
};
