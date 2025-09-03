import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type } = body

    if (!type || !['whitepaper', 'technical-plan'].includes(type)) {
      return NextResponse.json({ error: 'Valid type is required' }, { status: 400 })
    }

    // Get user info if authenticated
    let userId = null
    let userEmail = null
    
    try {
      const authResult = await auth()
      if (authResult.userId) {
        userId = authResult.userId
        const user = await currentUser()
        userEmail = user?.emailAddresses[0]?.emailAddress
      }
    } catch (e) {
      // User not authenticated, continue as anonymous
    }

    // Get IP and user agent from headers
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const { data: download, error } = await supabase
      .from('downloads')
      .insert({
        user_id: userId,
        user_email: userEmail,
        type,
        ip_address: ipAddress,
        user_agent: userAgent
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Update metrics
    try {
      const { count } = await supabase
        .from('downloads')
        .select('*', { count: 'exact', head: true })
        .eq('type', type)
      
      await supabase
        .from('project_metrics')
        .upsert({
          metric_name: `${type}_downloads`,
          metric_value: count || 0,
          metric_type: 'count',
          period: 'total'
        })
    } catch (metricsError) {
      console.error('Failed to update metrics:', metricsError)
    }

    return NextResponse.json({ success: true, download })
  } catch (error) {
    console.error('Error tracking download:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}