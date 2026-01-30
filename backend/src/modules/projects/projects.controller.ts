import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';

export async function createProject(req: Request, res: Response) {
  const user = (req as any).user;
  const { name, description } = req.body;
  const project = await prisma.project.create({ data: { name, description, ownerId: user.id } });
  return res.status(201).json(project);
}

export async function listProjects(req: Request, res: Response) {
  const user = (req as any).user;
  const projects = await prisma.project.findMany({ where: { ownerId: user.id } });
  return res.json(projects);
}