// Local database types for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          timezone: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          first_name: string
          last_name: string
          timezone?: string
          avatar_url?: string | null
        }
        Update: {
          first_name?: string
          last_name?: string
          timezone?: string
          avatar_url?: string | null
          updated_at?: string
        }
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          type: 'LIFE' | 'THREE_YEAR' | 'ANNUAL' | 'QUARTERLY'
          parent_goal_id: string | null
          target_date: string | null
          is_completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          title: string
          description?: string | null
          type: 'LIFE' | 'THREE_YEAR' | 'ANNUAL' | 'QUARTERLY'
          parent_goal_id?: string | null
          target_date?: string | null
          is_completed?: boolean
        }
        Update: {
          title?: string
          description?: string | null
          type?: 'LIFE' | 'THREE_YEAR' | 'ANNUAL' | 'QUARTERLY'
          parent_goal_id?: string | null
          target_date?: string | null
          is_completed?: boolean
          completed_at?: string | null
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          priority: 'A' | 'B' | 'C'
          rank: number | null
          status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          is_mit: boolean
          goal_id: string | null
          due_date: string | null
          completed_at: string | null
          estimated_minutes: number | null
          actual_minutes: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          title: string
          description?: string | null
          priority: 'A' | 'B' | 'C'
          rank?: number | null
          status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          is_mit?: boolean
          goal_id?: string | null
          due_date?: string | null
          estimated_minutes?: number | null
        }
        Update: {
          title?: string
          description?: string | null
          priority?: 'A' | 'B' | 'C'
          rank?: number | null
          status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          is_mit?: boolean
          goal_id?: string | null
          due_date?: string | null
          completed_at?: string | null
          estimated_minutes?: number | null
          actual_minutes?: number | null
          updated_at?: string
        }
      }
      weekly_plans: {
        Row: {
          id: string
          user_id: string
          week_start_date: string
          week_end_date: string
          focus_areas: string[] | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          week_start_date: string
          week_end_date: string
          focus_areas?: string[] | null
          notes?: string | null
        }
        Update: {
          week_start_date?: string
          week_end_date?: string
          focus_areas?: string[] | null
          notes?: string | null
          updated_at?: string
        }
      }
      weekly_plan_items: {
        Row: {
          id: string
          weekly_plan_id: string
          task_id: string
          priority: 'A' | 'B' | 'C'
          rank: number | null
          is_mit: boolean
          created_at: string
        }
        Insert: {
          weekly_plan_id: string
          task_id: string
          priority: 'A' | 'B' | 'C'
          rank?: number | null
          is_mit?: boolean
        }
        Update: {
          priority?: 'A' | 'B' | 'C'
          rank?: number | null
          is_mit?: boolean
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          type: 'WEEKLY' | 'MONTHLY'
          period_start: string
          period_end: string
          accomplishments: string[] | null
          challenges: string[] | null
          lessons_learned: string[] | null
          next_period_focus: string[] | null
          satisfaction_score: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          type: 'WEEKLY' | 'MONTHLY'
          period_start: string
          period_end: string
          accomplishments?: string[] | null
          challenges?: string[] | null
          lessons_learned?: string[] | null
          next_period_focus?: string[] | null
          satisfaction_score?: number | null
          notes?: string | null
        }
        Update: {
          type?: 'WEEKLY' | 'MONTHLY'
          period_start?: string
          period_end?: string
          accomplishments?: string[] | null
          challenges?: string[] | null
          lessons_learned?: string[] | null
          next_period_focus?: string[] | null
          satisfaction_score?: number | null
          notes?: string | null
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      goal_type: 'LIFE' | 'THREE_YEAR' | 'ANNUAL' | 'QUARTERLY'
      priority: 'A' | 'B' | 'C'
      task_status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
      review_type: 'WEEKLY' | 'MONTHLY'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}