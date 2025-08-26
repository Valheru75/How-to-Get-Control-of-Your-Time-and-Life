import { z } from 'zod';
import { UUIDSchema, ReviewTypeSchema } from './common';
import { Review } from './database';

// Review creation and update schemas
export const CreateReviewSchema = z.object({
  type: ReviewTypeSchema,
  period_start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  period_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  accomplishments: z.array(z.string().min(1)).max(10).optional(),
  challenges: z.array(z.string().min(1)).max(10).optional(),
  lessons_learned: z.array(z.string().min(1)).max(10).optional(),
  next_period_focus: z.array(z.string().min(1)).max(10).optional(),
  satisfaction_score: z.number().min(1).max(10).optional(),
  notes: z.string().max(2000).optional(),
});

export const UpdateReviewSchema = CreateReviewSchema.partial();

// Review templates and prompts
export interface ReviewPrompt {
  id: string;
  question: string;
  category: 'accomplishments' | 'challenges' | 'lessons_learned' | 'next_period_focus';
  type: 'WEEKLY' | 'MONTHLY';
  isRequired: boolean;
}

export const WEEKLY_REVIEW_PROMPTS: ReviewPrompt[] = [
  {
    id: 'weekly-accomplishments-1',
    question: 'What were your biggest wins this week?',
    category: 'accomplishments',
    type: 'WEEKLY',
    isRequired: true,
  },
  {
    id: 'weekly-accomplishments-2',
    question: 'Which goals did you make progress on?',
    category: 'accomplishments',
    type: 'WEEKLY',
    isRequired: false,
  },
  {
    id: 'weekly-challenges-1',
    question: 'What obstacles did you encounter?',
    category: 'challenges',
    type: 'WEEKLY',
    isRequired: true,
  },
  {
    id: 'weekly-challenges-2',
    question: 'What took longer than expected?',
    category: 'challenges',
    type: 'WEEKLY',
    isRequired: false,
  },
  {
    id: 'weekly-lessons-1',
    question: 'What did you learn about yourself this week?',
    category: 'lessons_learned',
    type: 'WEEKLY',
    isRequired: true,
  },
  {
    id: 'weekly-lessons-2',
    question: 'What would you do differently?',
    category: 'lessons_learned',
    type: 'WEEKLY',
    isRequired: false,
  },
  {
    id: 'weekly-focus-1',
    question: 'What are your top 3 priorities for next week?',
    category: 'next_period_focus',
    type: 'WEEKLY',
    isRequired: true,
  },
];

export const MONTHLY_REVIEW_PROMPTS: ReviewPrompt[] = [
  {
    id: 'monthly-accomplishments-1',
    question: 'What were your major achievements this month?',
    category: 'accomplishments',
    type: 'MONTHLY',
    isRequired: true,
  },
  {
    id: 'monthly-accomplishments-2',
    question: 'Which annual goals did you advance?',
    category: 'accomplishments',
    type: 'MONTHLY',
    isRequired: false,
  },
  {
    id: 'monthly-challenges-1',
    question: 'What were the biggest challenges you faced?',
    category: 'challenges',
    type: 'MONTHLY',
    isRequired: true,
  },
  {
    id: 'monthly-challenges-2',
    question: 'What patterns of difficulty emerged?',
    category: 'challenges',
    type: 'MONTHLY',
    isRequired: false,
  },
  {
    id: 'monthly-lessons-1',
    question: 'What important insights did you gain?',
    category: 'lessons_learned',
    type: 'MONTHLY',
    isRequired: true,
  },
  {
    id: 'monthly-lessons-2',
    question: 'How has your approach to time management evolved?',
    category: 'lessons_learned',
    type: 'MONTHLY',
    isRequired: false,
  },
  {
    id: 'monthly-focus-1',
    question: 'What are your key focus areas for next month?',
    category: 'next_period_focus',
    type: 'MONTHLY',
    isRequired: true,
  },
];

// Review analytics and insights
export const ReviewInsightsSchema = z.object({
  review_id: UUIDSchema,
  satisfaction_trend: z.enum(['improving', 'declining', 'stable']),
  common_challenges: z.array(z.string()),
  recurring_themes: z.array(z.string()),
  goal_alignment_score: z.number().min(0).max(100),
  productivity_indicators: z.object({
    task_completion_rate: z.number().min(0).max(100),
    mit_success_rate: z.number().min(0).max(100),
    goal_progress_rate: z.number().min(0).max(100),
  }),
});

// Review filters and sorting
export const ReviewFiltersSchema = z.object({
  type: ReviewTypeSchema.optional(),
  date_range: z.object({
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  }).optional(),
  satisfaction_range: z.object({
    min: z.number().min(1).max(10),
    max: z.number().min(1).max(10),
  }).optional(),
});

export const ReviewSortSchema = z.object({
  field: z.enum(['created_at', 'period_start', 'satisfaction_score']).default('period_start'),
  direction: z.enum(['asc', 'desc']).default('desc'),
});

// Review statistics
export const ReviewStatsSchema = z.object({
  total_reviews: z.number(),
  weekly_reviews: z.number(),
  monthly_reviews: z.number(),
  average_satisfaction: z.number().min(0).max(10),
  completion_streak: z.number(),
  last_review_date: z.string().datetime().optional(),
  next_review_due: z.string().datetime().optional(),
});

// TypeScript types
export type CreateReviewData = z.infer<typeof CreateReviewSchema>;
export type UpdateReviewData = z.infer<typeof UpdateReviewSchema>;
export type ReviewInsights = z.infer<typeof ReviewInsightsSchema>;
export type ReviewFilters = z.infer<typeof ReviewFiltersSchema>;
export type ReviewSort = z.infer<typeof ReviewSortSchema>;
export type ReviewStats = z.infer<typeof ReviewStatsSchema>;

// Review helper functions types
export interface ReviewPeriod {
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  type: 'WEEKLY' | 'MONTHLY';
}

export interface ReviewTemplate {
  type: 'WEEKLY' | 'MONTHLY';
  prompts: ReviewPrompt[];
  estimatedMinutes: number;
  description: string;
}

export const REVIEW_TEMPLATES: ReviewTemplate[] = [
  {
    type: 'WEEKLY',
    prompts: WEEKLY_REVIEW_PROMPTS,
    estimatedMinutes: 15,
    description: 'A quick weekly reflection to assess progress and plan ahead',
  },
  {
    type: 'MONTHLY',
    prompts: MONTHLY_REVIEW_PROMPTS,
    estimatedMinutes: 30,
    description: 'A comprehensive monthly review to evaluate goals and adjust strategy',
  },
];