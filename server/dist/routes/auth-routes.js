"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_js_1 = require("../models/user.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = (0, express_1.Router)();
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        console.log('Login request received');
        const user = yield user_js_1.User.findOne({ where: { email } });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const secret = process.env.JWT_SECRET_KEY || 'fallback_secret';
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, { expiresIn: '1h' });
        console.log('Authentication successful');
        return res.json({ token });
    }
    catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
router.post('/seed-user', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const testUser = yield user_js_1.User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: '$2b$10$jpbKvAh7zzSqRm/jZfM0u.yKXPk0R5.4QHOaoKjQIjUrqhHdxVp4K', // password123
        });
        res.status(201).json({ message: 'Seed user created!', testUser });
    }
    catch (error) {
        console.error('Seeding error:', error);
        res.status(500).json({ message: 'Failed to seed user' });
    }
}));
router.delete('/delete-user', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_js_1.User.destroy({ where: { email: 'admin@example.com' } });
        res.status(200).json({ message: 'Test user deleted' });
    }
    catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Failed to delete user' });
    }
}));
exports.default = router;
