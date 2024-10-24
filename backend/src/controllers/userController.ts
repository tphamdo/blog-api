import { Request, Response } from 'express';
import L from '../lib/logger';
import * as db from '../db/queries';

export async function registerPost(req: Request, res: Response): Promise<void> {
  const { username } = req.body;
  if (!username) {
    res.status(400).send('Username required.');
    return;
  }

  const user = await db.addUser(username);
  L.log(user);
  res.send('tpham -> register post');
}
