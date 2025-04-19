"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketRouter = void 0;
const express_1 = __importDefault(require("express"));
const ticket_controller_js_1 = require("../../controllers/ticket-controller.js");
const auth_js_1 = require("../../middleware/auth.js");
const router = express_1.default.Router();
exports.ticketRouter = router;
// GET /tickets - Get all tickets (protected)
router.get('/', auth_js_1.authenticateToken, ticket_controller_js_1.getAllTickets);
// GET /tickets/:id - Get a ticket by id (protected)
router.get('/:id', auth_js_1.authenticateToken, ticket_controller_js_1.getTicketById);
// POST /tickets - Create a new ticket (protected)
router.post('/', auth_js_1.authenticateToken, ticket_controller_js_1.createTicket);
// PUT /tickets/:id - Update a ticket by id (protected)
router.put('/:id', auth_js_1.authenticateToken, ticket_controller_js_1.updateTicket);
// DELETE /tickets/:id - Delete a ticket by id (protected)
router.delete('/:id', auth_js_1.authenticateToken, ticket_controller_js_1.deleteTicket);
