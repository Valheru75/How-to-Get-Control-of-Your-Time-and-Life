import { z } from 'zod';

// Common enums and constants
export const Priority = {
  A: 'A',
  B: 'B',
  C: 'C',
} as const;

export const GoalType = {
  LIFE: 'LIFE',
  THREE_YEAR: 'THREE_YEAR',
  ANNUAL: 'ANNUAL',
  QUARTERLY: 'QUARTERLY',
} as const;

export const TaskStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const ReviewType = {
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
} as const;

// Zod schemas for validation
export const PrioritySchema = z.enum(['A', 'B', 'C']);
export const GoalTypeSchema = z.enum(['LIFE', 'THREE_YEAR', 'ANNUAL', 'QUARTERLY']);
export const TaskStatusSchema = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);
export const ReviewTypeSchema = z.enum(['WEEKLY', 'MONTHLY']);

// TypeScript types
export type Priority = z.infer<typeof PrioritySchema>;
export type GoalType = z.infer<typeof GoalTypeSchema>;
export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type ReviewType = z.infer<typeof ReviewTypeSchema>;

// Common utility schemas
export const UUIDSchema = z.string().uuid();
export const DateTimeSchema = z.string().datetime();
export const OptionalDateTimeSchema = z.string().datetime().optional();

// Pagination
export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
});

export type Pagination = z.infer<typeof PaginationSchema>;

// API Response wrapper
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    success: z.boolean(),
    message: z.string().optional(),
  });

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

// Error response
export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;