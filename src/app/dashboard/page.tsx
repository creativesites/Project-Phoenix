'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, BarChart3, MessageCircle, FileText, Users, TrendingUp, CheckCircle, Clock, AlertTriangle, Reply } from 'lucide-react'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

interface Feedback {
  id: string
  page: string
  section?: string
  content: string
  status: 'new' | 'reviewed' | 'in_progress' | 'addressed'
  user_name: string
  created_at: string
  feedback_responses?: FeedbackResponse[]
}

interface FeedbackResponse {
  id: string
  content: string
  user_name: string
  created_at: string
}

interface Metrics {
  whitepaper_downloads: number
  beta_signups: number
  feedback_items: number
  development_progress: number
  monthly_growth: number
  partner_engagement: number
  technical_milestone_completion: number
  user_retention_rate: number
  feedback_by_status: {
    new: number
    reviewed: number
    in_progress: number
    addressed: number
  }
}

export default function Dashboard() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('overview')
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [replyText, setReplyText] = useState('')
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)

  useEffect(() => {
    fetchMetrics()
    fetchFeedback()
  }, [])

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics')
      if (response.ok) {
        const data = await response.json()
        setMetrics(data.metrics)
      }
    } catch (error) {
      console.error('Error fetching metrics:', error)
    }
  }

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/feedback')
      if (response.ok) {
        const data = await response.json()
        setFeedback(data.feedbacks)
      }
    } catch (error) {
      console.error('Error fetching feedback:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFeedbackStatus = async (feedbackId: string, status: string) => {
    try {
      const response = await fetch(`/api/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchFeedback()
        fetchMetrics()
      }
    } catch (error) {
      console.error('Error updating feedback status:', error)
    }
  }

  const submitReply = async () => {
    if (!selectedFeedback || !replyText.trim()) return
    
    setIsSubmittingReply(true)
    try {
      const response = await fetch(`/api/feedback/${selectedFeedback.id}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: replyText }),
      })

      if (response.ok) {
        setReplyText('')
        fetchFeedback()
        // Update selected feedback with new response
        const updatedResponse = await fetch(`/api/feedback/${selectedFeedback.id}`)
        if (updatedResponse.ok) {
          const data = await updatedResponse.json()
          setSelectedFeedback(data.feedback)
        }
      }
    } catch (error) {
      console.error('Error submitting reply:', error)
    } finally {
      setIsSubmittingReply(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Less than an hour ago'
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return '1 day ago'
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  const developmentTasks = [
    { task: 'Landing Page Design', phase: 'Phase 1', status: 'completed', progress: 100 },
    { task: 'Authentication System', phase: 'Phase 1', status: 'completed', progress: 100 },
    { task: 'Whitepaper Content', phase: 'Phase 1', status: 'completed', progress: 100 },
    { task: 'Technical Plan Page', phase: 'Phase 1', status: 'completed', progress: 100 },
    { task: 'Feedback System', phase: 'Phase 1', status: 'completed', progress: 100 },
    { task: 'Supabase Integration', phase: 'Phase 1', status: 'completed', progress: 100 },
    { task: 'PDF Generation', phase: 'Phase 1', status: 'completed', progress: 100 },
    { task: 'Production Database', phase: 'Phase 1', status: 'in-progress', progress: 90 },
    { task: 'API Optimization', phase: 'Phase 2', status: 'in-progress', progress: 25 },
    { task: 'Mobile App Planning', phase: 'Phase 2', status: 'pending', progress: 0 }
  ]

  return (
    <div className="min-h-screen text-gray-900 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Platform
              </Link>
              <div className="text-2xl font-bold text-gray-900">Partner Dashboard</div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* <Link href="/admin-setup" className="text-sm text-purple-600 hover:text-purple-800 transition-colors">
                Admin Setup
              </Link> */}
              <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
              <UserButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Partner Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Monitor progress, provide feedback, and collaborate on Tradvest
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Overview */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : metrics ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <span className="text-sm font-medium px-2 py-1 rounded text-green-700 bg-green-100">
                    +{Math.round(metrics.monthly_growth)}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{metrics.whitepaper_downloads}</div>
                <div className="text-gray-600 text-sm">Whitepaper Downloads</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                  <span className="text-sm font-medium px-2 py-1 rounded text-green-700 bg-green-100">
                    +{Math.round(metrics.partner_engagement - 75)}%
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{metrics.beta_signups}</div>
                <div className="text-gray-600 text-sm">Beta Signups</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <MessageCircle className="h-8 w-8 text-purple-600" />
                  <span className="text-sm font-medium px-2 py-1 rounded text-blue-700 bg-blue-100">
                    {metrics.feedback_by_status.new} new
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{metrics.feedback_items}</div>
                <div className="text-gray-600 text-sm">Feedback Items</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <span className="text-sm font-medium px-2 py-1 rounded text-green-700 bg-green-100">
                    On Track
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{Math.round(metrics.development_progress)}%</div>
                <div className="text-gray-600 text-sm">Development Progress</div>
              </motion.div>
            </div>
          ) : null}

          {/* Additional Metrics Row */}
          {metrics && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-900 mb-1">{Math.round(metrics.partner_engagement)}%</div>
                <div className="text-blue-700 text-sm">Partner Engagement</div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                <div className="text-2xl font-bold text-orange-900 mb-1">{Math.round(metrics.technical_milestone_completion)}%</div>
                <div className="text-orange-700 text-sm">Technical Milestones</div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="text-2xl font-bold text-green-900 mb-1">{Math.round(metrics.user_retention_rate)}%</div>
                <div className="text-green-700 text-sm">User Retention</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="text-2xl font-bold text-purple-900 mb-1">{Math.round(metrics.monthly_growth)}%</div>
                <div className="text-purple-700 text-sm">Monthly Growth</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex space-x-8 px-8 pt-6">
              {[
                { id: 'overview', label: 'Project Overview', icon: FileText },
                { id: 'feedback', label: 'Feedback Center', icon: MessageCircle },
                { id: 'progress', label: 'Development Progress', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold mb-6">Project Status</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Current Phase</h4>
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-semibold">Phase 1: Foundation & Landing</span>
                          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">In Progress</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <div className="text-sm text-gray-600">85% Complete • Weeks 1-2</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium mb-4">Next Milestones</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-600 mr-3" />
                          <span className="text-sm">Complete feedback system implementation</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-600 mr-3" />
                          <span className="text-sm">Begin Phase 2: Backend Infrastructure</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-600 mr-3" />
                          <span className="text-sm">Database design and API development</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-medium mb-4">Key Accomplishments</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        'Comprehensive whitepaper created with African focus',
                        'Modern, responsive landing page with smooth animations',
                        'Partner authentication and dashboard system',
                        'Detailed technical roadmap and phase planning',
                        'Budget allocation and success metrics defined',
                        'Risk management strategy implemented'
                      ].map((accomplishment, index) => (
                        <div key={index} className="flex items-start bg-green-50 p-3 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-green-800">{accomplishment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'feedback' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold">Feedback Management</h3>
                    <div className="flex space-x-2">
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                        onChange={() => {}} // Empty handler to satisfy TypeScript
                      >
                        <option value="">All Status</option>
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="addressed">Addressed</option>
                      </select>
                    </div>
                  </div>

                  {loading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 animate-pulse">
                          <div className="flex justify-between mb-4">
                            <div className="flex space-x-3">
                              <div className="h-4 bg-gray-200 rounded w-20"></div>
                              <div className="h-4 bg-gray-200 rounded w-16"></div>
                              <div className="h-4 bg-gray-200 rounded w-12"></div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                          </div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {feedback.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <span className="font-medium">{item.user_name}</span>
                              <span className="text-gray-400">•</span>
                              <span className="text-sm text-gray-600 capitalize">{item.page}</span>
                              {item.section && (
                                <>
                                  <span className="text-gray-400">•</span>
                                  <span className="text-sm text-gray-600">{item.section}</span>
                                </>
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                item.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                                item.status === 'in_progress' ? 'bg-orange-100 text-orange-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {item.status.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">{formatDate(item.created_at)}</span>
                              <div className="flex space-x-1">
                                <button
                                  onClick={() => setSelectedFeedback(item)}
                                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                  title="View Details & Reply"
                                >
                                  <Reply className="h-4 w-4" />
                                </button>
                                <div className="relative inline-block text-left">
                                  <select
                                    value={item.status}
                                    onChange={(e) => updateFeedbackStatus(item.id, e.target.value)}
                                    className="appearance-none bg-transparent border-0 text-xs text-gray-600 pr-4"
                                  >
                                    <option value="new">New</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="addressed">Addressed</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{item.content}</p>
                          
                          {/* Show responses if any */}
                          {item.feedback_responses && item.feedback_responses.length > 0 && (
                            <div className="border-t pt-4 mt-4">
                              <h5 className="font-medium text-gray-900 mb-3">Responses:</h5>
                              <div className="space-y-3">
                                {item.feedback_responses.map((response) => (
                                  <div key={response.id} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex justify-between mb-2">
                                      <span className="font-medium text-sm">{response.user_name}</span>
                                      <span className="text-xs text-gray-500">{formatDate(response.created_at)}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{response.content}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {feedback.length === 0 && !loading && (
                    <div className="text-center py-12">
                      <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No feedback items yet.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Feedback Detail Modal */}
              {selectedFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Feedback Details</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <span className="font-medium">{selectedFeedback.user_name}</span>
                          <span>•</span>
                          <span className="capitalize">{selectedFeedback.page}</span>
                          {selectedFeedback.section && (
                            <>
                              <span>•</span>
                              <span>{selectedFeedback.section}</span>
                            </>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedFeedback.status === 'new' ? 'bg-blue-100 text-blue-800' :
                            selectedFeedback.status === 'reviewed' ? 'bg-yellow-100 text-yellow-800' :
                            selectedFeedback.status === 'in_progress' ? 'bg-orange-100 text-orange-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {selectedFeedback.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedFeedback(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {selectedFeedback.content}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        {formatDate(selectedFeedback.created_at)}
                      </p>
                    </div>

                    {/* Responses */}
                    {selectedFeedback.feedback_responses && selectedFeedback.feedback_responses.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-4">Responses:</h4>
                        <div className="space-y-3">
                          {selectedFeedback.feedback_responses.map((response) => (
                            <div key={response.id} className="border-l-4 border-blue-200 pl-4">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium text-sm">{response.user_name}</span>
                                <span className="text-xs text-gray-500">{formatDate(response.created_at)}</span>
                              </div>
                              <p className="text-sm text-gray-700">{response.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reply Form */}
                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-3">Add Response:</h4>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        placeholder="Type your response..."
                      />
                      <div className="flex justify-between mt-4">
                        <div className="flex space-x-2">
                          <select
                            value={selectedFeedback.status}
                            onChange={(e) => {
                              const newStatus = e.target.value as Feedback['status']
                              updateFeedbackStatus(selectedFeedback.id, newStatus)
                              setSelectedFeedback({...selectedFeedback, status: newStatus})
                            }}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="in_progress">In Progress</option>
                            <option value="addressed">Addressed</option>
                          </select>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setSelectedFeedback(null)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={submitReply}
                            disabled={!replyText.trim() || isSubmittingReply}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                          >
                            {isSubmittingReply ? (
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            ) : (
                              <Reply className="h-4 w-4 mr-2" />
                            )}
                            Send Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'progress' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-semibold mb-6">Development Progress</h3>
                  
                  <div className="space-y-4">
                    {developmentTasks.map((task, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`h-3 w-3 rounded-full ${
                              task.status === 'completed' ? 'bg-green-500' :
                              task.status === 'in-progress' ? 'bg-orange-500' : 'bg-gray-300'
                            }`}></div>
                            <span className="font-medium">{task.task}</span>
                            <span className="text-sm text-gray-500">{task.phase}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.status === 'completed' ? 'bg-green-100 text-green-800' :
                            task.status === 'in-progress' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.status.replace('-', ' ')}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              task.status === 'completed' ? 'bg-green-500' :
                              task.status === 'in-progress' ? 'bg-orange-500' : 'bg-gray-300'
                            }`}
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600 mt-2">{task.progress}% Complete</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                        Overall Progress
                      </h4>
                      <div className="text-3xl font-bold text-blue-600 mb-2">35%</div>
                      <p className="text-sm text-gray-600">Phase 1 nearing completion. On track for Phase 2 start.</p>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                        Attention Needed
                      </h4>
                      <p className="text-sm text-gray-600">
                        Feedback system implementation requires partner input. 
                        Please review the proposed user interface design.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Tradvest</h3>
            <p className="text-gray-400">Partner collaboration dashboard for Africa&apos;s financial literacy platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}