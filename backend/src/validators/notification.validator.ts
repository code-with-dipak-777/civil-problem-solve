import { z } from 'zod';

export const notificationIdSchema = z.object({
  params: z.object({
    id: z.string().length(24, 'Invalid notification ID'),
  }),
});
