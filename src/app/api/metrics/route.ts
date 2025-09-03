import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get latest metrics
    const { data: metrics, error } = await supabase
      .from('project_metrics')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Get feedback count by status
    const { data: feedbackStats, error: feedbackError } = await supabase
      .from('feedback')
      .select('status')

    if (feedbackError) {
      console.error('Feedback stats error:', feedbackError)
    }

    // Process metrics into dashboard format
    const dashboardMetrics = {
      whitepaper_downloads: metrics.find(m => m.metric_name === 'whitepaper_downloads')?.metric_value || 0,
      beta_signups: metrics.find(m => m.metric_name === 'beta_signups')?.metric_value || 0,
      feedback_items: feedbackStats?.length || 0,
      development_progress: metrics.find(m => m.metric_name === 'development_progress')?.metric_value || 0,
      monthly_growth: metrics.find(m => m.metric_name === 'monthly_growth')?.metric_value || 0,
      partner_engagement: metrics.find(m => m.metric_name === 'partner_engagement')?.metric_value || 0,
      technical_milestone_completion: metrics.find(m => m.metric_name === 'technical_milestone_completion')?.metric_value || 0,
      user_retention_rate: metrics.find(m => m.metric_name === 'user_retention_rate')?.metric_value || 0,
      feedback_by_status: {
        new: feedbackStats?.filter(f => f.status === 'new').length || 0,
        reviewed: feedbackStats?.filter(f => f.status === 'reviewed').length || 0,
        in_progress: feedbackStats?.filter(f => f.status === 'in_progress').length || 0,
        addressed: feedbackStats?.filter(f => f.status === 'addressed').length || 0,
      }
    }

    return NextResponse.json({ metrics: dashboardMetrics })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}