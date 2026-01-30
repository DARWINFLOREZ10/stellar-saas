import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma';
import { env } from '../../config/env';

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashed, name, role: 'USER' } });
  return res.status(201).json({ id: user.id, email: user.email, name: user.name, role: user.role });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: '1h' });
  return res.json({ token });
}

export async function me(req: Request, res: Response) {
  const user = (req as any).user;
  return res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
}