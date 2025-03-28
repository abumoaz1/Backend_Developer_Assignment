const express = require('express');
const { check } = require('express-validator');
const { protect } = require('../middleware/auth.middleware');
const {
    getProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/profile.controller');

const router = express.Router();

// Diagnostic middleware
router.use((req, res, next) => {
    console.log('Profile route hit:', req.method, req.originalUrl);
    next();
});

// Update profile validation
const updateProfileValidation = [
    check('name', 'Name must be a string').optional().isString(),
    check('address', 'Address must be a string').optional().isString(),
    check('bio', 'Bio must be a string').optional().isString(),
    check('profilePicture', 'Profile picture must be a valid URL').optional().isURL()
];

// Doc route - before protect
router.get('/docs', (req, res) => {
    res.json({
        message: 'Profile API Documentation',
        endpoints: {
            get: {
                method: 'GET',
                url: '/api/profile',
                auth: 'Bearer token required'
            },
            update: {
                method: 'PUT',
                url: '/api/profile',
                auth: 'Bearer token required',
                body: {
                    name: 'string (optional)',
                    address: 'string (optional)',
                    bio: 'string (optional)',
                    profilePicture: 'URL string (optional)'
                }
            },
            delete: {
                method: 'DELETE',
                url: '/api/profile',
                auth: 'Bearer token required'
            }
        }
    });
});

// Protected routes
router.use(protect);

router.get('/', getProfile);
router.put('/', updateProfileValidation, updateProfile);
router.delete('/', deleteProfile);

module.exports = router; 