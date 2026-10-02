import { Router } from 'express';
import { getAllUsers, updateUserRole, deleteUser, deleteIssue } from '../controllers/admin.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';

const router = Router();

// Protect all admin routes
router.use(requireAuth);
router.use(requireRole('Admin'));

router.get('/users', getAllUsers);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);
router.delete('/issues/:id', deleteIssue);

export default router;
