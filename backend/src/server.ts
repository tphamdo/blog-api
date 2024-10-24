import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import L from './lib/logger';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.use('/blogs', routes.blogs);
app.use('/users', routes.users);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => L.log(`Listening on port: ${PORT}`));
