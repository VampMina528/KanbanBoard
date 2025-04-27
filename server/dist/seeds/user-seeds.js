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
exports.seedUsers = void 0;
const user_js_1 = require("../models/user.js");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = [
        {
            username: 'JollyGuru',
            email: 'jolly@example.com',
            password: yield bcryptjs_1.default.hash('password', 10),
        },
        {
            username: 'SunnyScribe',
            email: 'sunny@example.com',
            password: yield bcryptjs_1.default.hash('password', 10),
        },
        {
            username: 'RadiantComet',
            email: 'radiant@example.com',
            password: yield bcryptjs_1.default.hash('password', 10),
        },
        {
            username: 'testuser',
            email: 'testuser@example.com',
            password: yield bcryptjs_1.default.hash('1234', 10), // Password is 1234
        },
    ];
    yield user_js_1.User.bulkCreate(users);
    console.log('Users seeded!');
});
exports.seedUsers = seedUsers;
