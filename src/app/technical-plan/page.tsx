'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Code, Database, Smartphone, Globe, Shield, Zap, CheckCircle, Clock, AlertCircle, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { useState } from 'react'
import FeedbackButton from '@/components/FeedbackButton'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function TechnicalPlan() {
  const { isSignedIn, user } = useUser()
  const [selectedPhase, setSelectedPhase] = useState(1)
  const [feedbackText, setFeedbackText] = useState('')
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false)

  const submitFeedback = async () => {
    if (!feedbackText.trim()) return
    
    setIsSubmittingFeedback(true)
    try {
      const selectedPhaseName = phases.find(p => p.id === selectedPhase)?.title
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: 'technical-plan',
          section: selectedPhaseName,
          content: feedbackText
        }),
      })

      if (response.ok) {
        setFeedbackText('')
        // Show success message or notification
        alert('Feedback submitted successfully!')
      } else {
        console.error('Failed to submit feedback')
        alert('Failed to submit feedback. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Error submitting feedback. Please try again.')
    } finally {
      setIsSubmittingFeedback(false)
    }
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Partner Access Required</h1>
          <p className="text-gray-600 mb-6">
            This technical plan is only accessible to authenticated partners. Please sign in to continue.
          </p>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Sign In to Access
            </button>
          </SignInButton>
          <div className="mt-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              ← Back to Whitepaper
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const phases = [
    {
      id: 1,
      title: 'Foundation & Landing',
      duration: 'Weeks 1-2',
      status: 'in-progress',
      description: 'Website infrastructure and foundational content',
      tasks: [
        'Next.js 14 website with Tailwind CSS',
        'Whitepaper content creation and structure',
        'Domain setup and SSL certificate',
        'Basic SEO optimization and analytics'
      ],
      tech: ['Next.js 14', 'Tailwind CSS', 'Vercel', 'Google Analytics']
    },
    {
      id: 2,
      title: 'Backend Infrastructure',
      duration: 'Weeks 2-4',
      status: 'upcoming',
      description: 'Core backend systems and database architecture',
      tasks: [
        'JWT authentication with Clerk integration',
        'PostgreSQL database design and setup',
        'RESTful API endpoints for core functionality',
        'Security implementation and rate limiting'
      ],
      tech: ['Django REST Framework', 'PostgreSQL', 'Clerk Auth', 'Redis']
    },
    {
      id: 3,
      title: 'Mobile MVP Development',
      duration: 'Weeks 4-8',
      status: 'upcoming',
      description: 'React Native app with core features',
      tasks: [
        'Onboarding flow with financial assessment',
        'Educational content delivery system',
        'Goal setting and tracking functionality',
        'Portfolio simulator with ZMW/USD support'
      ],
      tech: ['React Native', 'Expo', 'Redux Toolkit', 'Twelve Data API']
    },
    {
      id: 4,
      title: 'Launch Preparation',
      duration: 'Week 8+',
      status: 'upcoming',
      description: 'Testing, optimization, and market preparation',
      tasks: [
        'Beta testing with 50+ pilot users',
        'Performance optimization and bug fixes',
        'App store submissions (iOS/Android)',
        'Marketing campaign preparation'
      ],
      tech: ['TestFlight', 'Google Play Console', 'Mixpanel', 'Firebase']
    }
  ]

  const techStack = {
    frontend: [
      { name: 'Next.js 14', description: 'React framework for web platform' },
      { name: 'React Native', description: 'Cross-platform mobile development' },
      { name: 'Tailwind CSS', description: 'Utility-first CSS framework' },
      { name: 'Framer Motion', description: 'Animation library for smooth UX' }
    ],
    backend: [
      { name: 'Django REST Framework', description: 'Python backend framework' },
      { name: 'PostgreSQL', description: 'Primary database for data storage' },
      { name: 'Redis', description: 'Caching and session management' },
      { name: 'Clerk', description: 'Authentication and user management' }
    ],
    infrastructure: [
      { name: 'Vercel', description: 'Web hosting and deployment' },
      { name: 'DigitalOcean', description: 'Backend server hosting' },
      { name: 'Twelve Data API', description: 'Financial market data' },
      { name: 'Firebase', description: 'Push notifications and analytics' }
    ]
  }

  return (
    <div className="min-h-screen text-gray-600 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Whitepaper
              </Link>
              <div className="text-2xl font-bold text-gray-900">Technical Plan</div>
            </div>
            
            <div className="flex items-center space-x-6">
              {isSignedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
                  <UserButton />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Partner Login
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Technical
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {" "}Roadmap
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive 3-phase development plan for building Africa&apos;s premier financial literacy platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Phase Overview */}
      <section className="py-16 bg-white text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Development Phases</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedPhase(phase.id)}
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedPhase === phase.id
                      ? 'bg-blue-50 border-2 border-blue-200 shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                      {phase.duration}
                    </span>
                    <div className={`h-3 w-3 rounded-full ${
                      phase.status === 'in-progress' ? 'bg-orange-500' :
                      phase.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{phase.title}</h3>
                  <p className="text-gray-600 text-sm">{phase.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phase Details */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {phases
            .filter(phase => phase.id === selectedPhase)
            .map(phase => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{phase.title}</h2>
                    <p className="text-lg text-gray-600">{phase.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {phase.duration}
                    </span>
                    {phase.status === 'in-progress' && (
                      <div className="flex items-center text-orange-600">
                        <Clock className="h-4 w-4 mr-2" />
                        In Progress
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Key Tasks
                    </h3>
                    <ul className="space-y-3">
                      {phase.tasks.map((task, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Code className="h-5 w-5 text-blue-600 mr-2" />
                      Technology Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {phase.tech.map((tech, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {isSignedIn && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4 flex items-center">
                        <MessageCircle className="h-5 w-5 text-blue-600 mr-2" />
                        Partner Feedback Zone
                      </h4>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        placeholder={`Share your thoughts on ${phase.title} phase...`}
                      />
                      <button 
                        onClick={submitFeedback}
                        disabled={!feedbackText.trim() || isSubmittingFeedback}
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                        {isSubmittingFeedback ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Feedback'
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Technical Architecture</h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl"
              >
                <div className="flex items-center mb-6">
                  <Smartphone className="h-8 w-8 text-orange-600 mr-3" />
                  <h3 className="text-2xl font-semibold">Frontend</h3>
                </div>
                <div className="space-y-4">
                  {techStack.frontend.map((tech, index) => (
                    <div key={index} className="border-l-4 border-orange-300 pl-4">
                      <h4 className="font-medium">{tech.name}</h4>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl"
              >
                <div className="flex items-center mb-6">
                  <Database className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-semibold">Backend</h3>
                </div>
                <div className="space-y-4">
                  {techStack.backend.map((tech, index) => (
                    <div key={index} className="border-l-4 border-blue-300 pl-4">
                      <h4 className="font-medium">{tech.name}</h4>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl"
              >
                <div className="flex items-center mb-6">
                  <Globe className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-semibold">Infrastructure</h3>
                </div>
                <div className="space-y-4">
                  {techStack.infrastructure.map((tech, index) => (
                    <div key={index} className="border-l-4 border-green-300 pl-4">
                      <h4 className="font-medium">{tech.name}</h4>
                      <p className="text-sm text-gray-600">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Budget & Resources */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Budget Allocation</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-center">Month 1</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-orange-600">K2,400</span>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span>Domain & Hosting</span>
                    <span className="font-medium">K400</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Design Tools</span>
                    <span className="font-medium">K200</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Development Tools</span>
                    <span className="font-medium">K300</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Third-party APIs</span>
                    <span className="font-medium">K200</span>
                  </li>
                  <li className="flex justify-between border-t pt-3">
                    <span className="font-medium">Buffer</span>
                    <span className="font-medium">K1,300</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-center">Month 2</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-blue-600">K2,400</span>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span>App Store Accounts</span>
                    <span className="font-medium">K500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Testing Services</span>
                    <span className="font-medium">K400</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Enhanced Hosting</span>
                    <span className="font-medium">K300</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Marketing Prep</span>
                    <span className="font-medium">K200</span>
                  </li>
                  <li className="flex justify-between border-t pt-3">
                    <span className="font-medium">Buffer</span>
                    <span className="font-medium">K1,000</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6 text-center">Month 3</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-green-600">K2,400</span>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex justify-between">
                    <span>Production Hosting</span>
                    <span className="font-medium">K600</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Legal & Compliance</span>
                    <span className="font-medium">K800</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Initial Marketing</span>
                    <span className="font-medium">K500</span>
                  </li>
                  <li className="flex justify-between border-t pt-3 mt-6">
                    <span className="font-medium">Buffer</span>
                    <span className="font-medium">K500</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Success Metrics & KPIs</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: '100+', label: 'Whitepaper Downloads', icon: CheckCircle, color: 'text-green-600' },
                { metric: '50+', label: 'Beta App Testers', icon: AlertCircle, color: 'text-blue-600' },
                { metric: '70%+', label: 'Onboarding Completion', icon: Zap, color: 'text-orange-600' },
                { metric: '40%+', label: 'Weekly Active Users', icon: Shield, color: 'text-purple-600' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl text-center"
                >
                  <item.icon className={`h-12 w-12 ${item.color} mx-auto mb-4`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{item.metric}</div>
                  <div className="text-gray-600 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Risk Management */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Risk Management</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">Identified Risks</h3>
                <ul className="space-y-4">
                  {[
                    { risk: 'Technical Complexity', mitigation: 'Modular architecture allows feature pivoting' },
                    { risk: 'Market Validation', mitigation: 'Pilot testing with target users' },
                    { risk: 'Financial Constraints', mitigation: 'Lean development and graduated investment' },
                    { risk: 'Regulatory Compliance', mitigation: 'Early legal review and compliance integration' }
                  ].map((item, index) => (
                    <li key={index} className="border-l-4 border-red-300 pl-4">
                      <h4 className="font-medium text-red-800">{item.risk}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.mitigation}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">Competitive Advantages</h3>
                <ul className="space-y-4">
                  {[
                    'African-First Design: Built specifically for African economic realities',
                    'Dual Model: Individual education + institutional partnerships',
                    'Local Expertise: Founders understand market and technical needs',
                    'AI Integration: Modern technology for personalized guidance'
                  ].map((advantage, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feedback Button */}
      <FeedbackButton page="technical-plan" color="blue" />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Tradvest</h3>
              <p className="text-gray-400">Technical roadmap for Africa&apos;s financial literacy platform.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Whitepaper</Link></li>
                <li><Link href="/technical-plan" className="hover:text-white transition-colors">Technical Plan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Partnership</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/sign-in" className="hover:text-white transition-colors">Partner Login</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Development</h4>
              <p className="text-gray-400">Building with modern, scalable technology.</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Tradvest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}