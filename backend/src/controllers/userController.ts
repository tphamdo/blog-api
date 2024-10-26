import { Request, Response } from 'express';
import * as db from '../db/queries';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import L from '../lib/logger';

export async function registerPost(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password required.' });
    return;
  }

  if (!process.env.PRIVATE_KEY) {
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }

  let user = await db.addUser(username, password);
  if (!user) {
    res.status(409).json({ message: 'Username already exists' });
    return;
  }

  const reducedUser = { id: user.id, username: user.username };
  const token = jwt.sign(reducedUser, process.env.PRIVATE_KEY, {
    expiresIn: process.env.EXPIRES_IN || '60s',
  });

  L.log(`${JSON.stringify(user, null, 4)}`);
  L.log(`${JSON.stringify(token, null, 4)}`);

  res.json({ token });
}

export async function loginPost(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password required.' });
    return;
  }
  passport.authenticate(
    'local',
    {},
    (err: any, user?: Express.User | false | null) => {
      if (err || !user) {
        res.status(401).json({ message: 'Incorrect username/password' });
        return;
      }

      if (!process.env.PRIVATE_KEY) {
        res.status(500).json({ message: 'Internal Server Error' });
        return;
      }

      const reducedUser = { id: user.id, username: user.username };
      const token = jwt.sign(reducedUser, process.env.PRIVATE_KEY, {
        expiresIn: process.env.EXPIRES_IN || '60s',
      });

      L.log(`${JSON.stringify(user, null, 4)}`);
      L.log(`${JSON.stringify(token, null, 4)}`);
      res.json({ token });
    },
  )(req, res);
}

export async function protectedGet(req: Request, res: Response): Promise<void> {
  res.json({ message: 'got inside protected route' });
}
