import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import L from './lib/logger';

const app = express();

app.use('/', (_req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => L.log(`Listening on port: ${PORT}`));
