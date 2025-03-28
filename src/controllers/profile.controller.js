const { validationResult } = require('express-validator');
const User = require('../models/user.model');

// Get user profile
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// Update user profile
exports.updateProfile = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const { name, address, bio, profilePicture } = req.body;
        const updateData = {};

        // Only update fields that are sent
        if (name) updateData.name = name;
        if (address) updateData.address = address;
        if (bio) updateData.bio = bio;
        if (profilePicture) updateData.profilePicture = profilePicture;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// Delete user profile
exports.deleteProfile = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        
        res.json({
            success: true,
            message: 'User profile deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}; 