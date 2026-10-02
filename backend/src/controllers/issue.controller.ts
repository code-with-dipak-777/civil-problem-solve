import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse, AppError } from '../utils/apiResponse';
import { uploadImage } from '../services/cloudinary.service';
import { createIssueService, getIssuesService, upvoteIssueService } from '../services/issue.service';
import { Issue } from '../models/Issue.model';
import { Notification } from '../models/Notification.model';

export const createIssue = asyncHandler(async (req: any, res: Response) => {
  if (!req.file) throw new AppError('Photo is required', 400);

  const photoUrl = await uploadImage(req.file.buffer);
  
  const issueData = {
    ...req.body,
    photoUrl,
    reportedBy: req.user._id,
  };

  const result = await createIssueService(issueData);

  successResponse(res, 201, 'Issue created successfully', result);
});

export const getIssues = asyncHandler(async (req: Request, res: Response) => {
  const result = await getIssuesService(req.query);
  res.status(200).json({ success: true, ...result });
});

export const getMyIssues = asyncHandler(async (req: any, res: Response) => {
  const issues = await Issue.find({ reportedBy: req.user._id }).sort({ createdAt: -1 });
  successResponse(res, 200, 'My issues retrieved', issues);
});

export const getNearbyIssues = asyncHandler(async (req: Request, res: Response) => {
  const { latitude, longitude, radius = 200 } = req.query;
  if (!latitude || !longitude) throw new AppError('Latitude and longitude are required', 400);

  const parsedRadius = Math.min(Number(radius), 5000); // Max 5km

  const issues = await Issue.find({
    coordinates: {
      $nearSphere: {
        $geometry: { type: 'Point', coordinates: [Number(longitude), Number(latitude)] },
        $maxDistance: parsedRadius,
      },
    },
    isMerged: false
  });

  successResponse(res, 200, 'Nearby issues retrieved', issues);
});

export const getIssueById = asyncHandler(async (req: Request, res: Response) => {
  const issue = await Issue.findById(req.params.id)
    .populate('reportedBy', 'name avatar badge')
    .populate('mergedInto');

  if (!issue) throw new AppError('Issue not found', 404);
  successResponse(res, 200, 'Issue retrieved', issue);
});

export const updateIssueStatus = asyncHandler(async (req: any, res: Response) => {
  const { status, note, department } = req.body;
  const issue = await Issue.findById(req.params.id);
  if (!issue) throw new AppError('Issue not found', 404);

  issue.status = status;
  issue.timeline.push({
    date: new Date(),
    stage: status,
    note,
    department,
    isCompleted: status === 'Resolved',
  });
  await issue.save();

  await Notification.create({
    userId: issue.reportedBy,
    title: `Issue ${status}`,
    description: `Your issue (${issue.complaintId}) status is now ${status}. ${note}`,
    type: status === 'Resolved' ? 'resolved' : 'status_update',
  });

  successResponse(res, 200, 'Issue status updated', issue);
});

export const addTimelineEvent = asyncHandler(async (req: any, res: Response) => {
  const { stage, note, department, isCompleted } = req.body;
  const issue = await Issue.findById(req.params.id);
  if (!issue) throw new AppError('Issue not found', 404);

  issue.timeline.push({
    date: new Date(),
    stage,
    note,
    department,
    isCompleted: isCompleted || false,
  });
  await issue.save();

  successResponse(res, 200, 'Timeline event added', issue);
});

export const upvoteIssue = asyncHandler(async (req: any, res: Response) => {
  const votes = await upvoteIssueService(req.params.id, req.user._id);
  successResponse(res, 200, 'Issue upvoted successfully', { votes });
});
