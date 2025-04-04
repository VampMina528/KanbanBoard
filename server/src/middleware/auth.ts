import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
interface AuthenticatedRequest extends Request {
  user?: { username: string };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401); // Unauthorized
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded || typeof decoded === 'string') {
      res.sendStatus(403); // Forbidden
      return;
    }

    // Set req.user with a safely typed username
    req.user = { username: (decoded as JwtPayload).username || 'unknown' };

    next();
  });
};
