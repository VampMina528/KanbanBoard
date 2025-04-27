import { Link } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler, useState } from 'react';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
}

const TicketCard = ({ ticket, deleteTicket }: TicketCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    if (!isNaN(ticketId)) {
      try {
        setIsDeleting(true);
        await deleteTicket(ticketId);
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="ticket-card">
      <h3>{ticket.name ?? ''}</h3>
      <p>{ticket.description ?? ''}</p>
      <p>{ticket.assignedUser?.username ?? 'Unassigned'}</p>
      <Link to={`/edit/${ticket.id ?? ''}`} className="editBtn">
        Edit
      </Link>
      <button
        type="button"
        value={ticket.id ?? ''}
        onClick={handleDelete}
        className="deleteBtn"
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default TicketCard;
