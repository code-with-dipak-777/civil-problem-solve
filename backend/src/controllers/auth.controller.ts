import { Request, Response } from 'express';
import { User } from '../models/User.model';
import { generateToken } from '../utils/generateToken';
import { AppError, successResponse } from '../utils/apiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, district, city, role } = req.body;

  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    throw new AppError('User already exists with this email', 400);
  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    district,
    city,
    role: role || 'Citizen',
  });

  const token = generateToken(user._id.toString(), user.role);

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    district: user.district,
    city: user.city,
    badge: user.badge,
    avatar: user.avatar,
  };

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { user: userData, token },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = generateToken(user._id.toString(), user.role);

  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    district: user.district,
    city: user.city,
    badge: user.badge,
    avatar: user.avatar,
  };

  successResponse(res, 200, 'Login successful', { user: userData, token });
});

export const getMe = asyncHandler(async (req: any, res: Response) => {
  const user = req.user;
  successResponse(res, 200, 'User profile retrieved successfully', { user });
});
