const forceDatabaseRefresh = true;

import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = ['https://kanbanboardmina.netlify.app'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


app.get('/ping', (_req, res) => {
  res.send('pong');
});


app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

const hash = bcrypt.hashSync('password123', 10);
console.log('Generated Hash:', hash);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
