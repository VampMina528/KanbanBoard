const forceDatabaseRefresh = false;

import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'https://kanbanboardmina.netlify.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use(routes);

app.use(express.static('client/dist'));

app.get('/ping', (_req, res) => {
  res.send('pong');
});

const hash = bcrypt.hashSync('password123', 10);
console.log('Generated Hash:', hash);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
