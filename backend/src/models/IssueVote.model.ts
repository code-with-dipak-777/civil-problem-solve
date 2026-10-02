import mongoose, { Document, Schema } from 'mongoose';

export interface IIssueVote extends Document {
  issueId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const issueVoteSchema = new Schema<IIssueVote>(
  {
    issueId: { type: Schema.Types.ObjectId, ref: 'Issue', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

issueVoteSchema.index({ issueId: 1, userId: 1 }, { unique: true });

export const IssueVote = mongoose.model<IIssueVote>('IssueVote', issueVoteSchema);
