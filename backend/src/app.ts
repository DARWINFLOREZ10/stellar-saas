import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/users.routes';
import projectRoutes from './modules/projects/projects.routes';
import orgRoutes from './modules/organizations/organizations.routes';

const logger = pino({ level: 'info' });

export const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/organizations', orgRoutes);

app.use(errorHandler);
