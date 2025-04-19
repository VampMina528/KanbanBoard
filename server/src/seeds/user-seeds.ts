import { User } from '../models/user.js';

export const seedUsers = async () => {
  const users = [
    {
      username: 'JollyGuru',
      email: 'jolly@example.com',
      password: 'password',
    },
    {
      username: 'SunnyScribe',
      email: 'sunny@example.com',
      password: 'password',
    },
    {
      username: 'RadiantComet',
      email: 'radiant@example.com',
      password: 'password',
    },
  ];

  await User.bulkCreate(users);
  console.log('Users seeded!');
};
