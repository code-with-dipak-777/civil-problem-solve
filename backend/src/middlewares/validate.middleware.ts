import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/apiResponse';

export const validate = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = (error as any).errors.map((e: any) => ({
          path: e.path.join('.'),
          message: e.message,
        }));
        return res.status(422).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }
      next(new AppError('Internal Server Error', 500));
    }
  };
};
