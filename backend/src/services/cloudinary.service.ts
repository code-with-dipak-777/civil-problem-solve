import cloudinary from '../config/cloudinary';
import { AppError } from '../utils/apiResponse';

export const uploadImage = async (fileBuffer: Buffer): Promise<string> => {
  // Bypass if cloudinary is not configured
  if (!process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY === 'your_api_key') {
    return 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80';
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'civic-connect' },
      (error, result) => {
        if (error) {
          reject(new AppError('Failed to upload image', 500));
        } else {
          resolve(result!.secure_url);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};
