import { Router } from 'express';
import { listUsers } from './users.controller';
import { authenticate, requireRole } from '../../middleware/auth';

const router = Router();

router.get('/', authenticate, requireRole('ADMIN'), listUsers);

export default router;