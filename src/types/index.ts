export type IssueCategory = 'Pothole' | 'Garbage' | 'Streetlight' | 'Drainage' | 'Water Leakage' | 'Road Damage' | 'Other';
export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  badge: string;
  district: string;
  city: string;
}

export interface IssueTimelineEvent {
  id: string;
  date: string;
  stage: string;
  note: string;
  department?: string;
  isCompleted: boolean;
}

export interface Issue {
  id: string;
  complaintId: string;
  title: string;
  category: IssueCategory;
  location: string;
  district: string;
  status: IssueStatus;
  reportedOn: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  landmark?: string;
  photoUrl: string;
  latitude: number;
  longitude: number;
  votes: number;
  timeline: IssueTimelineEvent[];
}

export interface DistrictStats {
  district: string;
  pending: number;
  resolved: number;
  total: number;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'status_update' | 'official_response' | 'merged' | 'resolved' | 'nearby' | 'district_update';
  isRead: boolean;
}

export interface DashboardStats {
  totalIssues: number;
  newToday: number;
  pending: number;
  pendingPercentage: number;
  resolved: number;
  resolvedPercentage: number;
  userReports: number;
}
