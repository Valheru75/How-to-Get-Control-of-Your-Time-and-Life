import { z } from 'zod';
import { UUIDSchema, DateTimeSchema, OptionalDateTimeSchema, PrioritySchema, GoalTypeSchema, TaskStatusSchema, ReviewTypeSchema } from './common';

// Database table schemas
export const ProfileSchema = z.object({
  id: UUIDSchema,
  user_id: UUIDSchema,
  first_name: z.string(),
  last_name: z.string(),
  timezone: z.string().default('America/New_York'),
  avatar_url: z.string().url().optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const GoalSchema = z.object({
  id: UUIDSchema,
  user_id: UUIDSchema,
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: GoalTypeSchema,
  parent_goal_id: UUIDSchema.optional(),
  target_date: OptionalDateTimeSchema,
  is_completed: z.boolean().default(false),
  completed_at: OptionalDateTimeSchema,
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const TaskSchema = z.object({
  id: UUIDSchema,
  user_id: UUIDSchema,
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: PrioritySchema,
  rank: z.number().min(1).max(5).optional(),
  status: TaskStatusSchema.default('PENDING'),
  is_mit: z.boolean().default(false), // Most Important Task
  goal_id: UUIDSchema.optional(),
  due_date: OptionalDateTimeSchema,
  completed_at: OptionalDateTimeSchema,
  estimated_minutes: z.number().positive().optional(),
  actual_minutes: z.number().positive().optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const WeeklyPlanSchema = z.object({
  id: UUIDSchema,
  user_id: UUIDSchema,
  week_start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  week_end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  focus_areas: z.array(z.string()).optional(),
  notes: z.string().optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

export const WeeklyPlanItemSchema = z.object({
  id: UUIDSchema,
  weekly_plan_id: UUIDSchema,
  task_id: UUIDSchema,
  priority: PrioritySchema,
  rank: z.number().min(1).max(5).optional(),
  is_mit: z.boolean().default(false),
  created_at: DateTimeSchema,
});

export const ReviewSchema = z.object({
  id: UUIDSchema,
  user_id: UUIDSchema,
  type: ReviewTypeSchema,
  period_start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  period_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  accomplishments: z.array(z.string()).optional(),
  challenges: z.array(z.string()).optional(),
  lessons_learned: z.array(z.string()).optional(),
  next_period_focus: z.array(z.string()).optional(),
  satisfaction_score: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
  created_at: DateTimeSchema,
  updated_at: DateTimeSchema,
});

// TypeScript types
export type Profile = z.infer<typeof ProfileSchema>;
export type Goal = z.infer<typeof GoalSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type WeeklyPlan = z.infer<typeof WeeklyPlanSchema>;
export type WeeklyPlanItem = z.infer<typeof WeeklyPlanItemSchema>;
export type Review = z.infer<typeof ReviewSchema>;

// Database insert types (without generated fields)
export type ProfileInsert = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
export type GoalInsert = Omit<Goal, 'id' | 'created_at' | 'updated_at'>;
export type TaskInsert = Omit<Task, 'id' | 'created_at' | 'updated_at'>;
export type WeeklyPlanInsert = Omit<WeeklyPlan, 'id' | 'created_at' | 'updated_at'>;
export type WeeklyPlanItemInsert = Omit<WeeklyPlanItem, 'id' | 'created_at'>;
export type ReviewInsert = Omit<Review, 'id' | 'created_at' | 'updated_at'>;

// Database update types (all fields optional except id)
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'user_id' | 'created_at'>> & { updated_at: string };
export type GoalUpdate = Partial<Omit<Goal, 'id' | 'user_id' | 'created_at'>> & { updated_at: string };
export type TaskUpdate = Partial<Omit<Task, 'id' | 'user_id' | 'created_at'>> & { updated_at: string };
export type WeeklyPlanUpdate = Partial<Omit<WeeklyPlan, 'id' | 'user_id' | 'created_at'>> & { updated_at: string };
export type ReviewUpdate = Partial<Omit<Review, 'id' | 'user_id' | 'created_at'>> & { updated_at: string };

// Supabase Database type definition
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      goals: {
        Row: Goal;
        Insert: GoalInsert;
        Update: GoalUpdate;
      };
      tasks: {
        Row: Task;
        Insert: TaskInsert;
        Update: TaskUpdate;
      };
      weekly_plans: {
        Row: WeeklyPlan;
        Insert: WeeklyPlanInsert;
        Update: WeeklyPlanUpdate;
      };
      weekly_plan_items: {
        Row: WeeklyPlanItem;
        Insert: WeeklyPlanItemInsert;
        Update: Partial<WeeklyPlanItem>;
      };
      reviews: {
        Row: Review;
        Insert: ReviewInsert;
        Update: ReviewUpdate;
      };
    };
  };
}