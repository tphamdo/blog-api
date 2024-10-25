import { Request, Response } from 'express';
import * as db from '../db/queries';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export async function registerPost(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Username and password required.');
    return;
  }

  if (!process.env.PRIVATE_KEY) {
    res.status(500).send('Internal Server Error');
    return;
  }

  const user = await db.addUser(username, password);
  if (!user) {
    res.status(500).send('Could not add user');
    return;
  }

  const token = jwt.sign(user, process.env.PRIVATE_KEY, {
    expiresIn: process.env.EXPIRES_IN || '30s',
  });
  res.json({ token });
}

export async function loginPost(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Username and password required.');
    return;
  }
  passport.authenticate(
    'local',
    {},
    (err: any, user?: Express.User | false | null) => {
      if (err || !user) {
        res.status(401).send('Incorrect username/password');
        return;
      }

      if (!process.env.PRIVATE_KEY) {
        res.status(500).send('Internal Server Error');
        return;
      }
      const token = jwt.sign(user, process.env.PRIVATE_KEY, {
        expiresIn: process.env.EXPIRES_IN || '30s',
      });

      res.json({ token });
    },
  )(req, res);
}

export async function protectedGet(req: Request, res: Response): Promise<void> {
  res.send('got inside protected route');
}
