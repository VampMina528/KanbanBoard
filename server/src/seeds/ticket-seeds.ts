import { Ticket } from '../models/ticket.js';

export const seedTickets = async () => {
  await Ticket.bulkCreate([
    {
      name: 'Design landing page',
      status: 'In Progress',
      description: 'Create wireframes and mockups for the landing page.',
      assignedUserId: 1,
    },
    {
      name: 'Set up project repository',
      status: 'Done',
      description: 'Create a new repository on GitHub and initialize it with a README file.',
      assignedUserId: 2,
    },
    {
      name: 'Implement authentication',
      status: 'Todo',
      description: 'Set up user authentication using JWT tokens.',
      assignedUserId: 1,
    },
    {
      name: 'Test the API',
      status: 'Todo',
      description: 'Test the API thoroughly using Insomnia or Postman.',
      assignedUserId: 1,
    },
    {
      name: 'Deploy to production',
      status: 'Todo',
      description: 'Deploy the application to Render and verify successful deployment.',
      assignedUserId: 2,
    },
    {
      name: 'Create User Dashboard',
      status: 'Todo',
      description: 'Design and implement a dashboard to display user tickets.',
      assignedUserId: 3,
    },
    {
      name: 'Fix critical bugs',
      status: 'In Progress',
      description: 'Fix all reported critical bugs found during testing.',
      assignedUserId: 3,
    },
  ]);
  
  console.log('Tickets seeded!');
};
