import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null,
  });

  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to retrieve user info', err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await createTicket(newTicket);
      console.log('Ticket created:', data);
      navigate('/');
    } catch (err) {
      console.error('Could not create ticket', err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({
      ...prev,
      [name]: name === 'assignedUserId' ? Number(value) : value,
    }));
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>

        <label htmlFor="tName">Ticket Name</label>
        <input
          id="tName"
          name="name"
          type="text"
          value={newTicket.name}
          onChange={handleChange}
        />

        <label htmlFor="tStatus">Ticket Status</label>
        <select
          id="tStatus"
          name="status"
          value={newTicket.status}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <label htmlFor="tDescription">Ticket Description</label>
        <textarea
          id="tDescription"
          name="description"
          value={newTicket.description}
          onChange={handleChange}
        />

        <label htmlFor="tUserId">Assign User</label>
        <select
          id="tUserId"
          name="assignedUserId"
          value={newTicket.assignedUserId}
          onChange={handleChange}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};

export default CreateTicket;
