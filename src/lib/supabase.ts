import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface Feedback {
  id: string
  user_id: string
  user_email: string
  user_name: string
  page: string
  section?: string
  content: string
  status: 'new' | 'reviewed' | 'in_progress' | 'addressed'
  created_at: string
  updated_at: string
  responses?: FeedbackResponse[]
}

export interface FeedbackResponse {
  id: string
  feedback_id: string
  user_id: string
  user_email: string
  user_name: string
  content: string
  created_at: string
}

export interface Download {
  id: string
  user_id?: string
  user_email?: string
  type: 'whitepaper' | 'technical-plan'
  ip_address?: string
  user_agent?: string
  created_at: string
}

export interface ProjectMetrics {
  id: string
  metric_name: string
  metric_value: number
  metric_type: 'count' | 'percentage' | 'currency'
  period: string
  created_at: string
}