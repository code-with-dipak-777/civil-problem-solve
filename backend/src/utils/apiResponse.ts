export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const successResponse = (res: any, statusCode: number, message: string, data: any = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
