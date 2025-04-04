import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {!loginCheck ? (
        <div className="login-notice">
          <h1>Login to create & view tickets</h1>
        </div>
      ) : (
        <div className="board">
          <button type="button" id="create-ticket-link">
            <Link to="/create">New Ticket</Link>
          </button>

          <div className="flex gap-4 mb-4 mt-4">
            <input
              type="text"
              placeholder="Filter tickets..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="p-2 border rounded w-full"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
            </select>
          </div>

          <div className="board-display mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {boardStates.map((status) => {
              const filteredTickets = tickets
                .filter((ticket) => {
                  const keyword = filterText.toLowerCase();
                  return (
                    ticket.status === status &&
                    (ticket.name.toLowerCase().includes(keyword) ||
                      ticket.description.toLowerCase().includes(keyword))
                  );
                })
                .sort((a, b) => {
                  if (sortOption === 'newest') {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                  }
                  if (sortOption === 'oldest') {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                  }
                  if (sortOption === 'az') {
                    return a.name.localeCompare(b.name);
                  }
                  if (sortOption === 'za') {
                    return b.name.localeCompare(a.name);
                  }
                  return 0;
                });

              return (
                <Swimlane
                  title={status}
                  key={status}
                  tickets={filteredTickets}
                  deleteTicket={deleteIndvTicket}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
