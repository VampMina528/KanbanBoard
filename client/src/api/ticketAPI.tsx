import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const retrieveTickets = async () => {
  try {
    const token = Auth.getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/tickets`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to retrieve tickets');
    }

    return data;
  } catch (err) {
    console.error('Error retrieving tickets:', err);
    return [];
  }
};

const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  if (!id) {
    throw new Error('Ticket ID is required');
  }

  try {
    const token = Auth.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data?.message || 'Failed to retrieve ticket';
      throw new Error(errorMessage);
    }

    return data; 
  } catch (err) {
    console.error('Error retrieving single ticket:', err);
    throw new Error(err instanceof Error ? err.message : 'Unknown error occurred');
  }
};

const createTicket = async (body: TicketData) => {
  try {
    const token = Auth.getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create ticket');
    }

    return data;
  } catch (err) {
    console.error('Error creating ticket:', err);
    return Promise.reject('Could not create ticket');
  }
};

const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const token = Auth.getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update ticket');
    }

    return data;
  } catch (err) {
    console.error('Error updating ticket:', err);
    return Promise.reject('Could not update ticket');
  }
};

const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const token = Auth.getToken();
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete ticket');
    }

    return data;
  } catch (err) {
    console.error('Error deleting ticket:', err);
    return Promise.reject('Could not delete ticket');
  }
};

export {
  createTicket,
  deleteTicket,
  retrieveTickets,
  retrieveTicket,
  updateTicket,
};
