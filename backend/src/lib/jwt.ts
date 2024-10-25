import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import L from './logger';

export function verifyToken(req: Request, res: Response, next: Function) {
  const bearerHeader = req.headers['authorization'];
  L.log('verifyToken');
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    if (!process.env.PRIVATE_KEY) {
      res.sendStatus(500);
    } else {
      jwt.verify(bearerToken, process.env.PRIVATE_KEY, (err) => {
        if (err) {
          res.sendStatus(403);
        } else {
          next();
        }
      });
    }
  } else {
    res.sendStatus(403);
  }
}
