import mongoose, { Document, Schema } from 'mongoose';

export interface IIssueTimeline {
  date: Date;
  stage: string;
  note: string;
  department?: string;
  isCompleted: boolean;
}

export interface IIssue extends Document {
  complaintId: string;
  title: string;
  description: string;
  category: 'Pothole' | 'Garbage' | 'Streetlight' | 'Drainage' | 'Water Leakage' | 'Road Damage' | 'Other';
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
  priority: 'High' | 'Medium' | 'Low';
  location: string;
  landmark?: string;
  district: string;
  coordinates: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  photoUrl: string;
  votes: number;
  reportedBy: mongoose.Types.ObjectId;
  reportedOn: Date;
  mergedInto?: mongoose.Types.ObjectId;
  isMerged: boolean;
  timeline: IIssueTimeline[];
  createdAt: Date;
  updatedAt: Date;
}

const timelineSchema = new Schema<IIssueTimeline>({
  date: { type: Date, default: Date.now },
  stage: { type: String, required: true },
  note: { type: String, required: true },
  department: { type: String },
  isCompleted: { type: Boolean, default: false },
});

const issueSchema = new Schema<IIssue>(
  {
    complaintId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['Pothole', 'Garbage', 'Streetlight', 'Drainage', 'Water Leakage', 'Road Damage', 'Other'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true,
    },
    location: { type: String, required: true },
    landmark: { type: String },
    district: { type: String, required: true },
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    photoUrl: { type: String, required: true },
    votes: { type: Number, default: 0 },
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reportedOn: { type: Date, default: Date.now },
    mergedInto: { type: Schema.Types.ObjectId, ref: 'Issue' },
    isMerged: { type: Boolean, default: false },
    timeline: [timelineSchema],
  },
  { timestamps: true }
);

issueSchema.index({ coordinates: '2dsphere' });
issueSchema.index({ status: 1 });
issueSchema.index({ category: 1 });
issueSchema.index({ district: 1 });
issueSchema.index({ reportedBy: 1 });

export const Issue = mongoose.model<IIssue>('Issue', issueSchema);
