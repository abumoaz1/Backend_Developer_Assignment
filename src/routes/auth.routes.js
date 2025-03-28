const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

// Diagnostic middleware
router.use((req, res, next) => {
    console.log('Auth route hit:', req.method, req.originalUrl);
    next();
});

// Register validation
const registerValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('address', 'Address is required').not().isEmpty()
];

// Login validation
const loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
];

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth test route working' });
});

// Documentation for auth routes
router.get('/', (req, res) => {
    res.json({
        message: 'Auth API Endpoints',
        endpoints: {
            register: {
                method: 'POST',
                url: '/api/auth/register',
                body: {
                    name: 'string (required)',
                    email: 'string (required)',
                    password: 'string (required, min 6 chars)',
                    address: 'string (required)'
                }
            },
            login: {
                method: 'POST',
                url: '/api/auth/login',
                body: {
                    email: 'string (required)',
                    password: 'string (required)'
                }
            }
        }
    });
});

// Documentation for register endpoint
router.get('/register', (req, res) => {
    res.json({
        message: 'Register Endpoint',
        method: 'POST',
        url: '/api/auth/register',
        body: {
            name: 'string (required)',
            email: 'string (required)',
            password: 'string (required, min 6 chars)',
            address: 'string (required)'
        }
    });
});

// Documentation for login endpoint
router.get('/login', (req, res) => {
    res.json({
        message: 'Login Endpoint',
        method: 'POST',
        url: '/api/auth/login',
        body: {
            email: 'string (required)',
            password: 'string (required)'
        }
    });
});

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

module.exports = router; 