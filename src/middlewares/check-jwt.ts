import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';

import { jwtSecret } from '../config';
import { JwtPayload } from '../model';

export const checkJwt = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.auth as string;
  let jwtPayload: JwtPayload;

  try {
    jwtPayload = verify(token, jwtSecret) as JwtPayload;
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  res.setHeader(
    'token',
    sign({ userId: jwtPayload.userId, username: jwtPayload.username }, jwtSecret, { expiresIn: '5m' })
  );
  next();
};
