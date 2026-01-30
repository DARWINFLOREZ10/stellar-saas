import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { createOrg, listMyOrgs } from './organizations.controller';

const router = Router();

router.post('/', authenticate, createOrg);
router.get('/', authenticate, listMyOrgs);

export default router;