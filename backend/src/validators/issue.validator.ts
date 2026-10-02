import { z } from 'zod';

export const createIssueSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.enum(['Pothole', 'Garbage', 'Streetlight', 'Drainage', 'Water Leakage', 'Road Damage', 'Other']),
    priority: z.enum(['High', 'Medium', 'Low']),
    location: z.string().min(5, 'Location must be at least 5 characters'),
    landmark: z.string().optional(),
    district: z.string().min(2, 'District is required'),
    latitude: z.string().transform((val) => parseFloat(val)),
    longitude: z.string().transform((val) => parseFloat(val)),
  }),
});

export const updateIssueStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Pending', 'In Progress', 'Resolved', 'Rejected']),
    note: z.string().min(5, 'Note must be at least 5 characters'),
    department: z.string().optional(),
  }),
});

export const timelineEventSchema = z.object({
  body: z.object({
    stage: z.string().min(2, 'Stage is required'),
    note: z.string().min(5, 'Note must be at least 5 characters'),
    department: z.string().optional(),
    isCompleted: z.boolean().optional(),
  }),
});
