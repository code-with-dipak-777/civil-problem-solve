import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { User, IUser } from '../models/User.model';

export interface AuthRequest extends Request {
  user?: IUser;
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    if (env.NODE_ENV === 'development') {
      try {
        const dummyUser = await User.findOneAndUpdate(
          { email: 'dummy@example.com' },
          {
            $setOnInsert: {
              name: 'Dummy User',
              email: 'dummy@example.com',
              password: 'Password@123',
              role: 'Citizen',
              district: 'Ranchi',
              city: 'Ranchi',
              badge: 'Newbie',
            }
          },
          { upsert: true, new: true }
        );
        req.user = dummyUser;
        return next();
      } catch (err: any) {
        console.error('Dev auth fallback error:', err.message, err.errors);
        return res.status(500).json({ success: false, message: 'Auth fallback failed: ' + err.message });
      }
    }
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }

  try {
    const decoded: any = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User no longer exists' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized' });
  }
};
