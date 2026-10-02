import { Issue } from '../models/Issue.model';
import { IssueVote } from '../models/IssueVote.model';
import { Notification } from '../models/Notification.model';
import { detectDuplicateIssue } from './ai.service';
import { generateComplaintId } from '../utils/generateComplaintId';
import { AppError } from '../utils/apiResponse';

export const createIssueService = async (issueData: any) => {
  const { title, description, category, priority, location, landmark, district, latitude, longitude, photoUrl, reportedBy } = issueData;

  const coordinates = [longitude, latitude];

  const candidateIssues = await Issue.find({
    category,
    status: { $in: ['Pending', 'In Progress'] },
    isMerged: false,
    coordinates: {
      $nearSphere: {
        $geometry: { type: 'Point', coordinates },
        $maxDistance: 200,
      },
    },
  });

  const duplicateCheck = await detectDuplicateIssue(
    { title, description, category, location, district },
    candidateIssues
  );

  if (duplicateCheck.isDuplicate && duplicateCheck.duplicateOfId) {
    const parentIssue = await Issue.findById(duplicateCheck.duplicateOfId);
    if (parentIssue) {
      const mergedIssue = await Issue.create({
        complaintId: generateComplaintId(),
        title,
        description,
        category,
        priority,
        location,
        landmark,
        district,
        coordinates: { type: 'Point', coordinates },
        photoUrl,
        reportedBy,
        isMerged: true,
        mergedInto: parentIssue._id,
        timeline: [{ stage: 'Report Submitted', note: 'Issue reported and detected as duplicate.' }],
      });

      parentIssue.votes += 1;
      await parentIssue.save();

      await Notification.create({
        userId: reportedBy,
        title: 'Your report was merged',
        description: 'Your report matches an existing civic issue nearby and has been linked to it.',
        type: 'merged',
      });

      return { issue: mergedIssue, merged: true, parentIssue };
    }
  }

  const newIssue = await Issue.create({
    complaintId: generateComplaintId(),
    title,
    description,
    category,
    priority,
    location,
    landmark,
    district,
    coordinates: { type: 'Point', coordinates },
    photoUrl,
    reportedBy,
    timeline: [{ stage: 'Report Submitted', note: 'New issue reported successfully.' }],
  });

  await Notification.create({
    userId: reportedBy,
    title: 'Report Submitted',
    description: `Your report (${newIssue.complaintId}) has been submitted successfully.`,
    type: 'status_update',
  });

  return { issue: newIssue, merged: false };
};

export const getIssuesService = async (queryOptions: any) => {
  const { page = 1, limit = 20, category, status, priority, district, search, sort = 'latest' } = queryOptions;

  const query: any = {};
  if (category) query.category = category;
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (district) query.district = district;
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOptions: any = {};
  if (sort === 'latest') sortOptions.createdAt = -1;
  else if (sort === 'oldest') sortOptions.createdAt = 1;
  else if (sort === 'votes') sortOptions.votes = -1;
  else sortOptions.createdAt = -1;

  const skip = (Number(page) - 1) * Number(limit);

  const issues = await Issue.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit))
    .populate('reportedBy', 'name avatar badge');

  const total = await Issue.countDocuments(query);

  return {
    data: issues,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

export const upvoteIssueService = async (issueId: string, userId: string) => {
  const issue = await Issue.findById(issueId);
  if (!issue) throw new AppError('Issue not found', 404);

  const existingVote = await IssueVote.findOne({ issueId, userId });
  if (existingVote) throw new AppError('You have already upvoted this issue', 409);

  await IssueVote.create({ issueId, userId });
  issue.votes += 1;
  await issue.save();

  return issue.votes;
};
