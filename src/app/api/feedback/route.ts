import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { page, section, content } = body

    if (!page || !content) {
      return NextResponse.json({ error: 'Page and content are required' }, { status: 400 })
    }

    // Get user details from Clerk
    const user = await currentUser()
    const userEmail = user?.emailAddresses[0]?.emailAddress || 'unknown@example.com'
    const userName = user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user?.username || userEmail.split('@')[0]

    const { data: feedback, error } = await supabase
      .from('feedback')
      .insert({
        user_id: userId,
        user_email: userEmail,
        user_name: userName,
        page,
        section: section || null,
        content,
        status: 'new'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Update metrics - increment feedback count
    try {
      const { count } = await supabase
        .from('feedback')
        .select('*', { count: 'exact', head: true })
      
      await supabase
        .from('project_metrics')
        .upsert({
          metric_name: 'feedback_items',
          metric_value: count || 0,
          metric_type: 'count',
          period: 'total'
        })
    } catch (metricsError) {
      console.error('Failed to update metrics:', metricsError)
      // Don't fail the request if metrics update fails
    }

    return NextResponse.json({ success: true, feedback })
  } catch (error) {
    console.error('Error creating feedback:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: feedbacks, error } = await supabase
      .from('feedback')
      .select(`
        *,
        feedback_responses (*)
      `)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ feedbacks })
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}