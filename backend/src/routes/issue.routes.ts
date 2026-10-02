import { Router } from 'express';
import {
  createIssue,
  getIssues,
  getMyIssues,
  getNearbyIssues,
  getIssueById,
  updateIssueStatus,
  addTimelineEvent,
  upvoteIssue,
} from '../controllers/issue.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/role.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createIssueSchema, updateIssueStatusSchema, timelineEventSchema } from '../validators/issue.validator';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.use(requireAuth);

router.post('/', upload.single('photo'), validate(createIssueSchema), createIssue);
router.get('/', getIssues);
router.get('/my', getMyIssues);
router.get('/nearby', getNearbyIssues);
router.get('/:id', getIssueById);
router.patch('/:id/status', requireRole('Authority', 'Admin'), validate(updateIssueStatusSchema), updateIssueStatus);
router.post('/:id/timeline', requireRole('Authority', 'Admin'), validate(timelineEventSchema), addTimelineEvent);
router.post('/:id/upvote', upvoteIssue);

export default router;
