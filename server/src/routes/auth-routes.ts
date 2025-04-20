import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log('Login request received');
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const secret = process.env.JWT_SECRET_KEY || 'fallback_secret';
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

    console.log('Authentication successful');
    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/seed-user', async (_req, res) => {
  try {
    const testUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: '$2b$10$jpbKvAh7zzSqRm/jZfM0u.yKXPk0R5.4QHOaoKjQIjUrqhHdxVp4K', // password123
    });

    res.status(201).json({ message: 'Seed user created!', testUser });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ message: 'Failed to seed user' });
  }
});

router.delete('/delete-user', async (_req, res) => {
  try {
    await User.destroy({ where: { email: 'admin@example.com' } });
    res.status(200).json({ message: 'Test user deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;
