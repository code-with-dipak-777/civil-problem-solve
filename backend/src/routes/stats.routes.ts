import { Router } from 'express';
import { getDashboardStats, getDistrictStats } from '../controllers/stats.controller';

const router = Router();

router.get('/dashboard', getDashboardStats);
router.get('/district', getDistrictStats);

export default router;
