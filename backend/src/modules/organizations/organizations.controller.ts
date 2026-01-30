import { Request, Response } from 'express';
import { prisma } from '../../config/prisma';

export async function createOrg(req: Request, res: Response) {
  const user = (req as any).user;
  const { name } = req.body;
  const org = await prisma.organization.create({ data: { name } });
  await prisma.membership.create({ data: { userId: user.id, organizationId: org.id, role: 'ADMIN' } });
  return res.status(201).json(org);
}

export async function listMyOrgs(req: Request, res: Response) {
  const user = (req as any).user;
  const orgs = await prisma.organization.findMany({
    where: { memberships: { some: { userId: user.id } } },
  });
  return res.json(orgs);
}