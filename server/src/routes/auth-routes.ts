import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

 
  if (username !== 'admin' || password !== 'password123') {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

   const payload = { username };

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  return res.status(200).json({ token });
});

export default router;
