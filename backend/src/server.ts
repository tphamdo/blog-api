import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import L from './lib/logger';
import routes from './routes/routes';
import './config/passport';
import * as userController from './controllers/userController';
import { verifyToken } from './lib/jwt';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.use('/blogs', routes.blogs);
app.post('/register', userController.registerPost);
app.post('/login', userController.loginPost);

app.get('/protected', verifyToken, userController.protectedGet);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => L.log(`Listening on port: ${PORT}`));
