import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401); // Unauthorized
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') {
            res.sendStatus(403); // Forbidden
            return;
        }
        // Set req.user with a safely typed username
        req.user = { username: decoded.username || 'unknown' };
        next();
    });
};
