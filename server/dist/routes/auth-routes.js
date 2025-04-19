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
    const { username, password } = req.body;
    try {
        console.log('🔐 Login request received');
        console.log('Request body:', req.body);
        const user = yield user_js_1.User.findOne({ where: { username } });
        console.log('User found:', user ? user.username : null);
        console.log('Entered password:', password);
        console.log('Stored hash:', user === null || user === void 0 ? void 0 : user.password);
        if (!user) {
            console.log('❌ User not found');
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const passwordIsValid = yield bcryptjs_1.default.compare(password, user.password);
        console.log('Password is valid:', passwordIsValid);
        if (!passwordIsValid) {
            console.log('❌ Invalid password');
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const secretKey = process.env.JWT_SECRET_KEY || 'your_fallback_secret';
        const token = jsonwebtoken_1.default.sign({ username }, secretKey, { expiresIn: '1h' });
        console.log('✅ Authentication successful');
        return res.json({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
exports.default = router;
