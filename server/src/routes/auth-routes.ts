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

export default router;
