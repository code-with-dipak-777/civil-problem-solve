import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: 'Citizen' | 'Authority' | 'Admin';
  district: string;
  city: string;
  badge?: string;
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: '' },
    role: {
      type: String,
      enum: ['Citizen', 'Authority', 'Admin'],
      default: 'Citizen',
    },
    district: { type: String, required: true },
    city: { type: String, required: true },
    badge: { type: String, default: 'Newbie' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password || '');
};

export const User = mongoose.model<IUser>('User', userSchema);
