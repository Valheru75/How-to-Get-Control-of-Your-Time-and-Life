import { z } from 'zod';
import { UUIDSchema, PrioritySchema, TaskStatusSchema } from './common';
import { Task } from './database';

// Task creation and update schemas
export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  priority: PrioritySchema,
  rank: z.number().min(1).max(5).optional(),
  is_mit: z.boolean().default(false),
  goal_id: UUIDSchema.optional(),
  due_date: z.string().datetime().optional(),
  estimated_minutes: z.number().positive().max(480).optional(), // Max 8 hours
});

export const UpdateTaskSchema = CreateTaskSchema.partial().extend({
  status: TaskStatusSchema.optional(),
  actual_minutes: z.number().positive().optional(),
});

// Task with related data
export interface TaskWithGoal extends Task {
  goal?: {
    id: string;
    title: string;
    type: string;
  };
}

// Task filters and sorting
export const TaskFiltersSchema = z.object({
  priority: PrioritySchema.optional(),
  status: TaskStatusSchema.optional(),
  is_mit: z.boolean().optional(),
  goal_id: UUIDSchema.optional(),
  has_due_date: z.boolean().optional(),
  is_overdue: z.boolean().optional(),
  search: z.string().optional(),
  date_range: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
});

export const TaskSortSchema = z.object({
  field: z.enum(['created_at', 'updated_at', 'due_date', 'priority', 'title']).default('created_at'),
  direction: z.enum(['asc', 'desc']).default('desc'),
});

// Swiss cheese method schemas
export const SwissCheeseNudgeSchema = z.object({
  task_id: UUIDSchema,
  suggested_duration: z.enum(['5', '10', '15']), // minutes
  suggested_action: z.string(),
  reason: z.string(),
});

export const TimeBlockSchema = z.object({
  task_id: UUIDSchema,
  start_time: z.string().datetime(),
  duration_minutes: z.number().positive().max(480),
  is_completed: z.boolean().default(false),
});

// Task analytics
export const TaskAnalyticsSchema = z.object({
  total_tasks: z.number(),
  completed_tasks: z.number(),
  pending_tasks: z.number(),
  overdue_tasks: z.number(),
  completion_rate: z.number().min(0).max(100),
  average_completion_time: z.number().optional(),
  priority_breakdown: z.object({
    A: z.number(),
    B: z.number(),
    C: z.number(),
  }),
  mit_completion_rate: z.number().min(0).max(100),
});

// Daily MITs (Most Important Tasks)
export const DailyMITsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  tasks: z.array(UUIDSchema).max(3), // Maximum 3 MITs per day
});

// Task templates for common activities
export interface TaskTemplate {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  estimated_minutes: number;
  category: string;
  tags: string[];
}

export const TASK_TEMPLATES: TaskTemplate[] = [
  {
    id: 'email-check',
    title: 'Check and respond to emails',
    description: 'Process inbox and respond to important messages',
    priority: 'B',
    estimated_minutes: 30,
    category: 'Communication',
    tags: ['daily', 'communication'],
  },
  {
    id: 'weekly-review',
    title: 'Weekly review and planning',
    description: 'Review past week and plan upcoming week',
    priority: 'A',
    estimated_minutes: 60,
    category: 'Planning',
    tags: ['weekly', 'review', 'planning'],
  },
  {
    id: 'exercise',
    title: 'Exercise/Physical activity',
    description: 'Engage in physical exercise or activity',
    priority: 'A',
    estimated_minutes: 45,
    category: 'Health',
    tags: ['daily', 'health', 'exercise'],
  },
  {
    id: 'reading',
    title: 'Read for learning/development',
    description: 'Read books, articles, or educational content',
    priority: 'B',
    estimated_minutes: 30,
    category: 'Learning',
    tags: ['learning', 'development'],
  },
];

// TypeScript types
export type CreateTaskData = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskData = z.infer<typeof UpdateTaskSchema>;
export type TaskFilters = z.infer<typeof TaskFiltersSchema>;
export type TaskSort = z.infer<typeof TaskSortSchema>;
export type SwissCheeseNudge = z.infer<typeof SwissCheeseNudgeSchema>;
export type TimeBlock = z.infer<typeof TimeBlockSchema>;
export type TaskAnalytics = z.infer<typeof TaskAnalyticsSchema>;
export type DailyMITs = z.infer<typeof DailyMITsSchema>;

import { Priority } from './common';