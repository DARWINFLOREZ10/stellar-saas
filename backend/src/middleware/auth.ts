import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../config/prisma';

export interface JwtPayload {
  sub: string;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing token' });
    }
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

    const user = await prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    (req as any).user = user;
    next();
  } catch (e: any) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

export function requireRole(...roles: Array<'ADMIN' | 'MANAGER' | 'USER'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}