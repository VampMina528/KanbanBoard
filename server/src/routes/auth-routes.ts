import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    console.log('🔐 Login request received');
    console.log('Request body:', req.body);

    const user = await User.findOne({ where: { email } });
    console.log('User found:', user ? user.email : null);
    console.log('Entered password:', password);
    console.log('Stored hash:', user?.password);

    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.log('Password is valid:', passwordIsValid);

    if (!passwordIsValid) {
      console.log('❌ Invalid password');
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'your_fallback_secret';
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

    console.log('✅ Authentication successful');
    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
