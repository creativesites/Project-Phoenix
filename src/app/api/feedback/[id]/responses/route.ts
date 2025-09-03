import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params // Resolve the params Promise to get the id
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    // Get user details from Clerk
    const user = await currentUser()
    const userEmail = user?.emailAddresses[0]?.emailAddress || 'unknown@example.com'
    const userName = user?.firstName && user?.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : user?.username || userEmail.split('@')[0]

    const { data: response, error } = await supabase
      .from('feedback_responses')
      .insert({
        feedback_id: id,
        user_id: userId,
        user_email: userEmail,
        user_name: userName,
        content
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Update metrics - feedback engagement  
    try {
      const { count } = await supabase
        .from('feedback_responses')
        .select('*', { count: 'exact', head: true })
      
      await supabase
        .from('project_metrics')
        .upsert({
          metric_name: 'feedback_responses',
          metric_value: count || 0,
          metric_type: 'count',
          period: 'total'
        })
    } catch (metricsError) {
      console.error('Failed to update metrics:', metricsError)
    }

    return NextResponse.json({ success: true, response })
  } catch (error) {
    console.error('Error creating feedback response:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}