"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401); // Unauthorized
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') {
            res.sendStatus(403); // Forbidden
            return;
        }
        // Set req.user with a safely typed username
        req.user = { username: decoded.username || 'unknown' };
        next();
    });
};
exports.authenticateToken = authenticateToken;
