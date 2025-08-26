import { z } from 'zod';
import { UUIDSchema, GoalTypeSchema } from './common';
import { Goal } from './database';

// Goal creation and update schemas
export const CreateGoalSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  type: GoalTypeSchema,
  parent_goal_id: UUIDSchema.optional(),
  target_date: z.string().datetime().optional(),
});

export const UpdateGoalSchema = CreateGoalSchema.partial().extend({
  is_completed: z.boolean().optional(),
});

// Goal hierarchy types
export interface GoalWithChildren extends Goal {
  children?: GoalWithChildren[];
  parent?: Goal;
}

export interface GoalHierarchy {
  lifeGoals: GoalWithChildren[];
  threeYearGoals: GoalWithChildren[];
  annualGoals: GoalWithChildren[];
  quarterlyGoals: GoalWithChildren[];
}

// Goal progress tracking
export const GoalProgressSchema = z.object({
  goal_id: UUIDSchema,
  total_tasks: z.number().min(0),
  completed_tasks: z.number().min(0),
  progress_percentage: z.number().min(0).max(100),
  last_activity: z.string().datetime().optional(),
});

export type GoalProgress = z.infer<typeof GoalProgressSchema>;

// Goal filters and sorting
export const GoalFiltersSchema = z.object({
  type: GoalTypeSchema.optional(),
  is_completed: z.boolean().optional(),
  has_target_date: z.boolean().optional(),
  parent_goal_id: UUIDSchema.optional(),
  search: z.string().optional(),
});

export const GoalSortSchema = z.object({
  field: z.enum(['created_at', 'updated_at', 'target_date', 'title']).default('created_at'),
  direction: z.enum(['asc', 'desc']).default('desc'),
});

// TypeScript types
export type CreateGoalData = z.infer<typeof CreateGoalSchema>;
export type UpdateGoalData = z.infer<typeof UpdateGoalSchema>;
export type GoalFilters = z.infer<typeof GoalFiltersSchema>;
export type GoalSort = z.infer<typeof GoalSortSchema>;

// Goal validation rules
export const GOAL_LIMITS = {
  LIFE: 3,
  THREE_YEAR: 10,
  ANNUAL: 5,
  QUARTERLY: 20,
} as const;

// Goal templates for onboarding
export interface GoalTemplate {
  id: string;
  title: string;
  description: string;
  type: GoalType;
  category: string;
  isPopular: boolean;
}

export const GOAL_TEMPLATES: GoalTemplate[] = [
  {
    id: 'health-fitness',
    title: 'Improve Physical Health',
    description: 'Focus on exercise, nutrition, and overall wellness',
    type: 'ANNUAL',
    category: 'Health',
    isPopular: true,
  },
  {
    id: 'career-growth',
    title: 'Advance Career',
    description: 'Develop skills, seek promotions, or change careers',
    type: 'ANNUAL',
    category: 'Career',
    isPopular: true,
  },
  {
    id: 'financial-security',
    title: 'Build Financial Security',
    description: 'Save money, invest, and plan for the future',
    type: 'THREE_YEAR',
    category: 'Finance',
    isPopular: true,
  },
  {
    id: 'relationships',
    title: 'Strengthen Relationships',
    description: 'Spend quality time with family and friends',
    type: 'LIFE',
    category: 'Relationships',
    isPopular: true,
  },
  {
    id: 'learning',
    title: 'Learn New Skills',
    description: 'Acquire knowledge and develop new competencies',
    type: 'ANNUAL',
    category: 'Education',
    isPopular: false,
  },
];

import { GoalType } from './common';