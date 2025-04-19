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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.createTicket = exports.getTicketById = exports.getAllTickets = void 0;
const ticket_js_1 = require("../models/ticket.js");
const user_js_1 = require("../models/user.js");
const getAllTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_js_1.User.findOne({ where: { username: (_a = req.user) === null || _a === void 0 ? void 0 : _a.username } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const tickets = yield ticket_js_1.Ticket.findAll({
            where: { assignedUserId: user.id },
            include: [
                {
                    model: user_js_1.User,
                    as: 'assignedUser',
                    attributes: ['username'],
                },
            ],
        });
        return res.json(tickets);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllTickets = getAllTickets;
const getTicketById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ticket = yield ticket_js_1.Ticket.findByPk(id, {
            include: [
                {
                    model: user_js_1.User,
                    as: 'assignedUser',
                    attributes: ['username'],
                },
            ],
        });
        if (!ticket || ticket.assignedUserId !== (yield getUserId(req))) {
            return res.status(403).json({ message: 'Access denied' });
        }
        return res.json(ticket);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getTicketById = getTicketById;
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, status, description } = req.body;
    try {
        const user = yield user_js_1.User.findOne({ where: { username: (_a = req.user) === null || _a === void 0 ? void 0 : _a.username } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const newTicket = yield ticket_js_1.Ticket.create({
            name,
            status,
            description,
            assignedUserId: user.id,
        });
        return res.status(201).json(newTicket);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.createTicket = createTicket;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, status, description } = req.body;
    try {
        const ticket = yield ticket_js_1.Ticket.findByPk(id);
        if (!ticket || ticket.assignedUserId !== (yield getUserId(req))) {
            return res.status(403).json({ message: 'Access denied' });
        }
        ticket.name = name;
        ticket.status = status;
        ticket.description = description;
        yield ticket.save();
        return res.json(ticket);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ticket = yield ticket_js_1.Ticket.findByPk(id);
        if (!ticket || ticket.assignedUserId !== (yield getUserId(req))) {
            return res.status(403).json({ message: 'Access denied' });
        }
        yield ticket.destroy();
        return res.json({ message: 'Ticket deleted' });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deleteTicket = deleteTicket;
const getUserId = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_js_1.User.findOne({ where: { username: (_a = req.user) === null || _a === void 0 ? void 0 : _a.username } });
    return user ? user.id : null;
});
