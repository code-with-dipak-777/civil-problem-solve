import { Request, Response } from 'express';
import { Issue } from '../models/Issue.model';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse } from '../utils/apiResponse';

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await Issue.aggregate([
    {
      $group: {
        _id: null,
        totalIssues: { $sum: 1 },
        pendingIssues: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } },
        inProgressIssues: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
        resolvedIssues: { $sum: { $cond: [{ $eq: ['$status', 'Resolved'] }, 1, 0] } },
        rejectedIssues: { $sum: { $cond: [{ $eq: ['$status', 'Rejected'] }, 1, 0] } },
        totalVotes: { $sum: '$votes' },
      },
    },
  ]);

  const defaultStats = {
    totalIssues: 0,
    pendingIssues: 0,
    inProgressIssues: 0,
    resolvedIssues: 0,
    rejectedIssues: 0,
    totalVotes: 0,
  };

  successResponse(res, 200, 'Dashboard stats retrieved', stats.length > 0 ? stats[0] : defaultStats);
});

export const getDistrictStats = asyncHandler(async (req: Request, res: Response) => {
  const districtStats = await Issue.aggregate([
    {
      $group: {
        _id: '$district',
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
        resolved: { $sum: { $cond: [{ $eq: ['$status', 'Resolved'] }, 1, 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        district: '$_id',
        total: 1,
        pending: 1,
        inProgress: 1,
        resolved: 1,
      },
    },
  ]);

  successResponse(res, 200, 'District stats retrieved', districtStats);
});
