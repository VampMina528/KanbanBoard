import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.js';
import { User } from '../models/user.js';

interface AuthenticatedRequest extends Request {
  user?: { username: string };
}

export const getAllTickets = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findOne({ where: { username: req.user?.username } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const tickets = await Ticket.findAll({
      where: { assignedUserId: user.id },
      include: [
        {
          model: User,
          as: 'assignedUser',
          attributes: ['username'],
        },
      ],
    });

    return res.json(tickets);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTicketById = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedUser',
          attributes: ['username'],
        },
      ],
    });

    if (!ticket || ticket.assignedUserId !== (await getUserId(req))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    return res.json(ticket);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTicket = async (req: AuthenticatedRequest, res: Response) => {
  const { name, status, description } = req.body;

  try {
    const user = await User.findOne({ where: { username: req.user?.username } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const newTicket = await Ticket.create({
      name,
      status,
      description,
      assignedUserId: user.id,
    });

    return res.status(201).json(newTicket);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateTicket = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, status, description } = req.body;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket || ticket.assignedUserId !== (await getUserId(req))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    ticket.name = name;
    ticket.status = status;
    ticket.description = description;
    await ticket.save();

    return res.json(ticket);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteTicket = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket || ticket.assignedUserId !== (await getUserId(req))) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await ticket.destroy();
    return res.json({ message: 'Ticket deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserId = async (req: AuthenticatedRequest): Promise<number | null> => {
  const user = await User.findOne({ where: { username: req.user?.username } });
  return user ? user.id : null;
};
