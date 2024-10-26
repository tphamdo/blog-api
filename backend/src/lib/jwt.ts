import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import L from './logger';

export function verifyToken(req: Request, res: Response, next: Function) {
  const bearerHeader = req.headers['authorization'];
  L.log(`bearerHeader: ${bearerHeader}`);
  L.log(typeof bearerHeader);
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    L.log(`bearerToken: ${bearerToken}`);

    if (!process.env.PRIVATE_KEY) {
      res.sendStatus(500);
    } else {
      jwt.verify(bearerToken, process.env.PRIVATE_KEY, (err) => {
        if (err) {
          L.log('sending 403');
          L.error(err);
          res.sendStatus(403);
        } else {
          next();
        }
      });
    }
  } else {
    L.log('sending 403');
    res.sendStatus(403);
  }
  L.log();
  L.log();
  L.log();
}
