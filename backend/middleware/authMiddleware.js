const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

// Middleware for Caregiver Only
const caregiverOnly = (req, res, next) => {
    if (req.user.role !== 'caregiver') {
        return res.status(403).json({ msg: 'Access denied. Only caregivers allowed.' });
    }
    next();
};

// Middleware for Patient Only
const patientOnly = (req, res, next) => {
    if (req.user.role !== 'patient') {
        return res.status(403).json({ msg: 'Access denied. Only patients allowed.' });
    }
    next();
};

module.exports = { authMiddleware, caregiverOnly, patientOnly };
