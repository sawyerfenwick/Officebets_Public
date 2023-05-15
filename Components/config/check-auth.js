const jwt = require('jsonwebtoken');
const Logger = require('../config/logger');

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return Logger.error_401(res);
    }
} 