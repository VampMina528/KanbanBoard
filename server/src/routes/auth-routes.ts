import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validate credentials (this can be more complex with a database lookup)
  if (username !== 'yourUsername' || password !== 'yourPassword') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create a payload (can include user id, roles, etc.)
  const payload = { username };

  // Sign the token with your secret and optionally set an expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  res.json({ token });
});

export default router;
