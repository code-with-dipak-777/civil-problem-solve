import { Request, Response } from 'express';
import { Notification } from '../models/Notification.model';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse, AppError } from '../utils/apiResponse';

export const getNotifications = asyncHandler(async (req: any, res: Response) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
  successResponse(res, 200, 'Notifications retrieved', notifications);
});

export const getUnreadCount = asyncHandler(async (req: any, res: Response) => {
  const count = await Notification.countDocuments({ userId: req.user._id, isRead: false });
  successResponse(res, 200, 'Unread count retrieved', { count });
});

export const markAsRead = asyncHandler(async (req: any, res: Response) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { isRead: true },
    { new: true }
  );

  if (!notification) throw new AppError('Notification not found', 404);
  successResponse(res, 200, 'Notification marked as read', notification);
});

export const markAllAsRead = asyncHandler(async (req: any, res: Response) => {
  await Notification.updateMany({ userId: req.user._id, isRead: false }, { isRead: true });
  successResponse(res, 200, 'All notifications marked as read', {});
});
