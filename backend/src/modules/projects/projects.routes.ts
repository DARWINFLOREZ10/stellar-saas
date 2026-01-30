import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { createProject, listProjects } from './projects.controller';

const router = Router();

router.post('/', authenticate, createProject);
router.get('/', authenticate, listProjects);

export default router;