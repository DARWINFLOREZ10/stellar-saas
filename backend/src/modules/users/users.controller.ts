import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';

export async function listUsers(_req: Request, res: Response) {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true } });
  return res.json(users);
}