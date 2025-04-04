import express from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../../controllers/ticket-controller.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = express.Router();

// GET /tickets - Get all tickets (protected)
router.get('/', authenticateToken, getAllTickets);

// GET /tickets/:id - Get a ticket by id (protected)
router.get('/:id', authenticateToken, getTicketById);

// POST /tickets - Create a new ticket (protected)
router.post('/', authenticateToken, createTicket);

// PUT /tickets/:id - Update a ticket by id (protected)
router.put('/:id', authenticateToken, updateTicket);

// DELETE /tickets/:id - Delete a ticket by id (protected)
router.delete('/:id', authenticateToken, deleteTicket);

export { router as ticketRouter };
