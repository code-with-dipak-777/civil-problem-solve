import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middlewares/error.middleware';
import { apiLimiter } from './middlewares/rateLimit.middleware';

import authRoutes from './routes/auth.routes';
import issueRoutes from './routes/issue.routes';
import notificationRoutes from './routes/notification.routes';
import statsRoutes from './routes/stats.routes';
import adminRoutes from './routes/admin.routes';
import { getAllUsers } from './controllers/admin.controller';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.NODE_ENV === 'development' ? true : env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);
app.get('/api/users', getAllUsers);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: 'CivicConnect API is running' });
});

app.use(errorHandler);

export default app;
