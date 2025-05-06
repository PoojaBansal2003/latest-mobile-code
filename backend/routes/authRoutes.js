const express = require('express');
const {authMiddleware} = require('../middleware/authMiddleware');
const { caregiverOnly, patientOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
    res.json({ msg: 'User profile', user: req.user });
});

// Caregiver-only route
router.get('/caregiver-dashboard', authMiddleware, caregiverOnly, (req, res) => {
    res.json({ msg: 'Welcome, Caregiver!' });
});

// Patient-only route
router.get('/patient-dashboard', authMiddleware, patientOnly, (req, res) => {
    res.json({ msg: 'Welcome, Patient!' });
});

module.exports = router;
