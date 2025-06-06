import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  const users = [
    {
      username: 'JollyGuru',
      email: 'jolly@example.com',
      password: await bcrypt.hash('password', 10),
    },
    {
      username: 'SunnyScribe',
      email: 'sunny@example.com',
      password: await bcrypt.hash('password', 10),
    },
    {
      username: 'RadiantComet',
      email: 'radiant@example.com',
      password: await bcrypt.hash('password', 10),
    },
    {
      username: 'testuser', 
      email: 'testuser@example.com',
      password: await bcrypt.hash('1234', 10), // Password is 1234
    },
  ];

  await User.bulkCreate(users);
  console.log('Users seeded!');
};
