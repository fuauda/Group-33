const { body, param, query } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const { BadRequestError } = require('../utils/errors');

// Validation middleware for NGO creation
const validateCreateNGO = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot be longer than 100 characters'),
    
  body('mission')
    .trim()
    .notEmpty().withMessage('Mission is required')
    .isLength({ max: 500 }).withMessage('Mission cannot be longer than 500 characters'),
    
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Description cannot be longer than 2000 characters'),
    
  body('logoUrl')
    .optional()
    .isURL().withMessage('Please provide a valid URL for the logo')
    .matches(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)
    .withMessage('Please provide a valid URL for the logo'),
    
  body('contact.email')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
    
  body('contact.phone')
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/).withMessage('Please provide a valid phone number'),
    
  body('contact.address.street')
    .notEmpty().withMessage('Street address is required'),
    
  body('contact.address.city')
    .notEmpty().withMessage('City is required'),
    
  body('contact.address.state')
    .optional(),
    
  body('contact.address.country')
    .notEmpty().withMessage('Country is required'),
    
  body('contact.address.postalCode')
    .notEmpty().withMessage('Postal code is required'),
    
  body('contact.website')
    .optional()
    .isURL().withMessage('Please provide a valid website URL')
    .matches(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)
    .withMessage('Please provide a valid website URL'),
    
  // Custom validation middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError('Validation failed', errors.array());
    }
    next();
  }
];

// Validation for updating NGO
const validateUpdateNGO = [
  param('id')
    .isMongoId().withMessage('Invalid NGO ID'),
    
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('Name cannot be empty')
    .isLength({ max: 100 }).withMessage('Name cannot be longer than 100 characters'),
    
  body('mission')
    .optional()
    .trim()
    .notEmpty().withMessage('Mission cannot be empty')
    .isLength({ max: 500 }).withMessage('Mission cannot be longer than 500 characters'),
    
  body('description')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Description cannot be longer than 2000 characters'),
    
  body('logoUrl')
    .optional()
    .isURL().withMessage('Please provide a valid URL for the logo')
    .matches(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)
    .withMessage('Please provide a valid URL for the logo'),
    
  body('contact.email')
    .optional()
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
    
  body('contact.phone')
    .optional()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/).withMessage('Please provide a valid phone number'),
    
  body('contact.website')
    .optional()
    .isURL().withMessage('Please provide a valid website URL')
    .matches(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/)
    .withMessage('Please provide a valid website URL'),
    
  // Custom validation middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError('Validation failed', errors.array());
    }
    next();
  }
];

// Validation for updating NGO status
const validateNGOStatus = [
  param('id')
    .isMongoId().withMessage('Invalid NGO ID'),
    
  body('status')
    .isIn(['approved', 'rejected', 'pending']).withMessage('Invalid status value'),
    
  body('note')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Note cannot be longer than 500 characters'),
    
  // Custom validation middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError('Validation failed', errors.array());
    }
    next();
  }
];

// Validation for query parameters
const validateQueryParams = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page must be a positive integer')
    .toInt(),
    
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
    .toInt(),
    
  query('search')
    .optional()
    .trim()
    .escape(),
    
  // Custom validation middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError('Validation failed', errors.array());
    }
    next();
  }
];

module.exports = {
  validateCreateNGO,
  validateUpdateNGO,
  validateNGOStatus,
  validateQueryParams
};
