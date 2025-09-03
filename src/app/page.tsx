'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Target, Users, TrendingUp, Shield, Globe, CheckCircle, Download, BarChart3, BookOpen, Smartphone, Zap, Calendar, PieChart, Mail, MapPin, Phone, Loader2, X } from 'lucide-react'
import Link from 'next/link'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'
import FeedbackButton from '@/components/FeedbackButton'
import { useState } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const { isSignedIn, user } = useUser()
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'preparing' | 'downloading' | 'success' | 'error'>('idle')

  const handleDownloadWhitepaper = async () => {
    if (downloadStatus === 'preparing' || downloadStatus === 'downloading') return
    
    setDownloadStatus('preparing')
    try {
      const response = await fetch('/api/pdf/whitepaper')
      if (response.ok) {
        setDownloadStatus('downloading')
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'Tradvest-Whitepaper.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        setDownloadStatus('success')
        setTimeout(() => setDownloadStatus('idle'), 3000)
      } else {
        console.error('Failed to download PDF')
        setDownloadStatus('error')
        setTimeout(() => setDownloadStatus('idle'), 3000)
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
      setDownloadStatus('error')
      setTimeout(() => setDownloadStatus('idle'), 3000)
    }
  }
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log('Subscribed with email:', email)
    setEmail('')
    alert('Thank you for subscribing to our updates!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Tradvest</span>
            </motion.div>
            
            <div className="flex items-center space-x-6">
              
              {isSignedIn ? (
                <>
                  <Link href="/technical-plan" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Technical Plan
                  </Link>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Welcome, {user?.firstName}</span>
                    <UserButton />
                  </div>
                </>
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    Partner Login
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm font-medium px-4 py-1 rounded-full mb-6"
            >
              Transforming Financial Literacy Across Africa
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Master Your Money
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 block">
                3 Minutes at a Time
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Mobile-first, gamified financial literacy app designed for Africa. Learn budgeting, saving, and investing 
              through bite-sized interactive lessons with real Zambian examples. Start free, grow at your own pace.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={handleDownloadWhitepaper}
                disabled={downloadStatus === 'preparing' || downloadStatus === 'downloading'}
                className={`px-8 py-4 rounded-lg transition-all duration-300 flex items-center group shadow-md hover:shadow-xl min-w-[200px] justify-center ${
                  downloadStatus === 'success' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : downloadStatus === 'error'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-lg disabled:opacity-70'
                } text-white`}
              >
                {downloadStatus === 'preparing' && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Preparing PDF...
                  </>
                )}
                {downloadStatus === 'downloading' && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                )}
                {downloadStatus === 'success' && (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Downloaded!
                  </>
                )}
                {downloadStatus === 'error' && (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Try Again
                  </>
                )}
                {downloadStatus === 'idle' && (
                  <>
                    Download Whitepaper
                    <Download className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
              
              <Link href="/technical-plan" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center shadow-sm hover:shadow-md">
                View Technical Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 flex flex-col items-center"
            >
              <p className="text-gray-500 mb-4">Trusted by forward-thinking organizations</p>
              <div className="flex flex-wrap justify-center gap-8 opacity-60">
                <div className="h-8 w-8 bg-blue-100 rounded-lg"></div>
                <div className="h-8 w-8 bg-green-100 rounded-lg"></div>
                <div className="h-8 w-8 bg-purple-100 rounded-lg"></div>
                <div className="h-8 w-8 bg-yellow-100 rounded-lg"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '70%', label: 'Of Africans lack financial literacy' },
              { value: '350M+', label: 'African middle class by 2030' },
              { value: '<5%', label: 'With adequate retirement plans' },
              { value: '$3T', label: 'Africa&apos;s consumer spending by 2030' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl"
              >
                <div className="text-3xl font-bold text-orange-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-8">
              Our Mission
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-4xl mx-auto mb-16">
              To empower everyday Africans with practical financial skills through bite-sized, gamified learning. 
              Starting with budgeting basics and growing into investment mastery - all with a freemium model that 
              makes financial education accessible to everyone.
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Micro-Learning Lessons</h3>
                <p className="text-gray-600">3-7 minute interactive lessons on budgeting, saving, and debt management using real Zambian money examples.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Smartphone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Mobile-First & Offline Ready</h3>
                <p className="text-gray-600">Download lessons for offline learning. Perfect for areas with limited data connectivity across Africa.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <PieChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Gamified Progress Tracking</h3>
                <p className="text-gray-600">Earn points, unlock badges, and track your financial goals with calculators and investment simulators.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Addressing Africa&apos;s Financial Literacy Gap</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                  <Shield className="h-6 w-6 text-red-500 mr-3" />
                  Critical Challenges
                </h3>
                <ul className="space-y-4">
                  {[
                    'Financial education not tailored to African economic realities',
                    'Investment platforms too complex for emerging market users',
                    'Lack of culturally relevant financial guidance and local examples',
                    'Limited access to affordable, trustworthy financial advice',
                    'Poor retirement planning across all age demographics',
                    'Disconnect between traditional banking and digital-native users'
                  ].map((challenge, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                  <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
                  Market Opportunity
                </h3>
                <ul className="space-y-4">
                  {[
                    'Africa&apos;s rapidly growing middle class seeking financial empowerment',
                    'Smartphone penetration exceeding 50% in many African markets',
                    'Government initiatives actively promoting financial inclusion',
                    'Limited competition in African-focused fintech education space',
                    'Young, digitally-native population eager to adopt new technologies',
                    'Increasing mobile money and digital payment adoption across continent'
                  ].map((opportunity, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-start p-4 bg-green-50 rounded-lg"
                    >
                      <div className="h-5 w-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">{opportunity}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Freemium Model Designed for Africa</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-orange-500"
              >
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-orange-800">Free Core + Premium Tools</h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                    <span><strong>FREE:</strong> Budgeting, saving, and debt management basics</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                    <span><strong>PREMIUM (K50-100/month):</strong> Investment simulators & advanced courses</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                    <span>Budgeting calculators for Zambian income levels</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                    <span>Goal-setting tools (saving for school fees, business capital)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                    <span>Community challenges and peer learning groups</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Target ARPU</h4>
                  <p className="text-orange-700">Year 1: K30/month | Year 2: K60/month | Year 3: K90/month</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-500"
              >
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-800">Institutional Licensing (B2B)</h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span>Enterprise dashboards for universities, NGOs, employers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span>Custom programs: K25,000-50,000/year (≈$1,000-2,000)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span>White-label solutions for banks and financial institutions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span>Corporate training and analytics packages</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span>Government partnership programs for financial inclusion</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Revenue Potential</h4>
                  <p className="text-blue-700">5-10 institutional clients = K300K+ annual revenue</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Serving Africa&apos;s Diverse Financial Needs</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl shadow-lg border border-orange-100"
              >
                <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Young Professionals (25-35)</h3>
                <p className="text-gray-700 mb-4">Starting careers, learning investment basics, building credit</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Student loan management</li>
                  <li>• First-time investment guidance</li>
                  <li>• Emergency fund planning</li>
                  <li>• Credit building strategies</li>
                </ul>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg border border-blue-100"
              >
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Established Middle Class (35-50)</h3>
                <p className="text-gray-700 mb-4">Planning retirement, wealth building, children&apos;s education</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Retirement planning</li>
                  <li>• Property investment</li>
                  <li>• Education funding</li>
                  <li>• Portfolio diversification</li>
                </ul>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl shadow-lg border border-green-100"
              >
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Students & Early Career (18-25)</h3>
                <p className="text-gray-700 mb-4">Building financial foundations, avoiding debt, starting small</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Budgeting basics</li>
                  <li>• Avoiding financial pitfalls</li>
                  <li>• Micro-investment options</li>
                  <li>• Side hustle guidance</li>
                </ul>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Institutional Clients</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                {[
                  { icon: <BookOpen className="h-6 w-6 text-purple-600 mx-auto" />, label: 'Universities' },
                  { icon: <Globe className="h-6 w-6 text-purple-600 mx-auto" />, label: 'NGOs' },
                  { icon: <BarChart3 className="h-6 w-6 text-purple-600 mx-auto" />, label: 'Employers' },
                  { icon: <Shield className="h-6 w-6 text-purple-600 mx-auto" />, label: 'Financial Institutions' }
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-sm">
                    {item.icon}
                    <p className="mt-2 text-gray-700">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="py-20 text-gray-900 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Advanced Technical Architecture</h2>
            <div className="text-center mb-16">
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                PhD-level implementation combining mobile-first architecture, custom AI algorithms, 
                and offline-capable data synchronization optimized for African infrastructure.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Mobile Architecture */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-blue-50 p-8 rounded-xl border border-blue-200"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-6">React Native Mobile Core</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Custom Gamification Engine</h4>
                    <p className="text-sm text-gray-600 mb-3">Proprietary point allocation algorithm based on Fogg Behavior Model (B = MAP)</p>
                    <code className="bg-gray-100 p-2 rounded text-xs block">
                      {`const motivation = userGoal.priority * progressRate;
const ability = contentDifficulty / userLevel;
const trigger = optimalNotificationTime();
const behavior = motivation * ability + trigger;`}
                    </code>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Adaptive Learning Algorithm</h4>
                    <p className="text-sm text-gray-600 mb-3">Spaced repetition system with African financial context weighting</p>
                    <code className="bg-gray-100 p-2 rounded text-xs block">
                      {`const nextReview = baseInterval * 
  (2.5 + 0.1 * correctAnswers - 0.8 * difficulty) * 
  localContextWeight(userLocation, contentType);`}
                    </code>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Offline-First Data Sync</h4>
                    <p className="text-sm text-gray-600">CRDTs (Conflict-free Replicated Data Types) for seamless offline operation</p>
                  </div>
                </div>
              </motion.div>

              {/* AI & Algorithms */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-orange-50 p-8 rounded-xl border border-orange-200"
              >
                <h3 className="text-2xl font-bold text-orange-900 mb-6">Custom AI Algorithms</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Financial Risk Assessment ML</h4>
                    <p className="text-sm text-gray-600 mb-3">Neural network trained on African economic indicators</p>
                    <code className="bg-gray-100 p-2 rounded text-xs block">
                      {`const riskScore = neuralNetwork.predict([
  income, expenses, savingsRate, 
  inflationRate, currencyStability,
  localEconomicFactors
]);`}
                    </code>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Personalized Content Engine</h4>
                    <p className="text-sm text-gray-600 mb-3">Hybrid collaborative filtering with content-based recommendations</p>
                    <code className="bg-gray-100 p-2 rounded text-xs block">
                      {`const similarity = cosineSimilarity(
  userVector, contentVector
) * culturalRelevanceScore(userProfile);`}
                    </code>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Budget Optimization Algorithm</h4>
                    <p className="text-sm text-gray-600">Linear programming for optimal allocation with Zambian cost constraints</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Architecture Diagram */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">System Architecture Overview</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">React Native</h4>
                  <p className="text-sm text-gray-600">Cross-platform mobile app with native performance</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Node.js API</h4>
                  <p className="text-sm text-gray-600">GraphQL endpoints with JWT authentication</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">PostgreSQL</h4>
                  <p className="text-sm text-gray-600">Primary database with Redis caching layer</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-semibold mb-2">TensorFlow</h4>
                  <p className="text-sm text-gray-600">ML models for personalization and risk assessment</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Platform Features Designed for Africa</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Culturally-Relevant Onboarding',
                  description: 'Financial literacy assessment, risk evaluation, and goal setting with Zambian and African economic scenarios.',
                  icon: Target,
                  color: 'orange'
                },
                {
                  title: 'Localized Educational Hub',
                  description: 'Bite-sized learning modules, Zambian success stories, and gamified progress tracking in local languages.',
                  icon: BookOpen,
                  color: 'blue'
                },
                {
                  title: 'Goal Setting & Tracking',
                  description: 'SMART financial goals with visual progress tracking and personalized milestones for African contexts.',
                  icon: CheckCircle,
                  color: 'green'
                },
                {
                  title: 'African Portfolio Simulator',
                  description: 'Paper trading with ZMW/USD, investment recommendations based on African market data.',
                  icon: TrendingUp,
                  color: 'purple'
                },
                {
                  title: 'AI-Powered Local Insights',
                  description: 'Personalized financial advice and investment suggestions tailored to African economic conditions.',
                  icon: Shield,
                  color: 'red'
                },
                {
                  title: 'Multi-Platform Accessibility',
                  description: 'Mobile app and web platform with low-data options for areas with limited connectivity.',
                  icon: Globe,
                  color: 'indigo'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`bg-white p-6 rounded-xl hover:shadow-lg transition-shadow border-l-4 border-${feature.color}-500`}
                >
                  <div className={`h-12 w-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Robust Technical Foundation</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Frontend Technologies</h3>
                <div className="space-y-4">
                  {[
                    { technology: 'React Native with Expo', purpose: 'Cross-platform mobile app (iOS/Android)' },
                    { technology: 'Next.js 14 with Tailwind CSS', purpose: 'Web platform and marketing site' },
                    { technology: 'Redux Toolkit', purpose: 'State management across applications' },
                    { technology: 'African-themed UI/UX', purpose: 'Culturally relevant design with multi-language support' }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <h4 className="font-medium text-gray-900">{item.technology}</h4>
                      <p className="text-gray-600 text-sm">{item.purpose}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Backend Infrastructure</h3>
                <div className="space-y-4">
                  {[
                    { technology: 'Django REST Framework', purpose: 'Robust API development and security' },
                    { technology: 'PostgreSQL with Redis', purpose: 'Data storage and caching for performance' },
                    { technology: 'JWT with Biometric Support', purpose: 'Secure authentication for financial data' },
                    { technology: 'African Market Data APIs', purpose: 'Local financial data integration' }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <h4 className="font-medium text-gray-900">{item.technology}</h4>
                      <p className="text-gray-600 text-sm">{item.purpose}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership & Development */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Success Metrics & Timeline</h2>
            
            <div className="grid md:grid-cols-1 gap-12 mb-12">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Development Timeline</h3>
                <div className=" grid md:grid-cols-2 space-y-6">
                  {[
                    { phase: 'Weeks 1-2: Foundation', tasks: ['Landing page', 'Whitepaper', 'Brand identity', 'Technical planning'] },
                    { phase: 'Weeks 2-4: Backend', tasks: ['Authentication system', 'Database design', 'API development', 'Security setup'] },
                    { phase: 'Weeks 4-8: Mobile MVP', tasks: ['React Native app', 'Core features', 'Testing', 'Beta feedback'] },
                    { phase: 'Week 8+: Launch Prep', tasks: ['App store submission', 'Pilot user acquisition', 'Performance optimization'] }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <h4 className="font-medium text-gray-900 mb-2 text-start">{item.phase}</h4>
                      <ul className="text-sm text-gray-700">
                        {item.tasks.map((task, i) => (
                          <li key={i} className="flex items-center">
                            <div className="h-1.5 w-1.5 bg-orange-500 rounded-full mr-2"></div>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Measurable Success Metrics</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div>
                  <h4 className="font-medium mb-3 text-orange-700">MVP Validation (3 months)</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>100+ whitepaper downloads</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>50+ beta app testers</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>70%+ onboarding completion</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>40%+ weekly active users</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-blue-700">Growth Targets</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Month 6: 500+ users</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Year 1: 2,000+ active users</span>
                    </li>
                    <li className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                      <span>Year 2: 10,000+ users</span>
                    </li>
                    <li className="flex items-center">
                      <Users className="h-4 w-4 text-blue-500 mr-2" />
                      <span>5-10 institutional partners</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3 text-green-700">Revenue Projections</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      <span>Year 1: User acquisition focus</span>
                    </li>
                    <li className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      <span>Year 2-3: Profitability target</span>
                    </li>
                    <li className="flex items-center">
                      <BarChart3 className="h-4 w-4 text-green-500 mr-2" />
                      <span>5-10 licenses = K300K+ revenue</span>
                    </li>
                    <li className="flex items-center">
                      <Target className="h-4 w-4 text-green-500 mr-2" />
                      <span>Institutional client focus</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Competitive Advantage</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Globe className="h-8 w-8 text-orange-600 mx-auto" />,
                  title: 'African-First Design',
                  description: 'Built specifically for African economic realities and cultural contexts'
                },
                {
                  icon: <Users className="h-8 w-8 text-blue-600 mx-auto" />,
                  title: 'Dual Model',
                  description: 'Combining individual education with institutional partnerships'
                },
                {
                  icon: <MapPin className="h-8 w-8 text-green-600 mx-auto" />,
                  title: 'Local Expertise',
                  description: 'Founders understand both technical requirements and market needs'
                },
                {
                  icon: <Zap className="h-8 w-8 text-purple-600 mx-auto" />,
                  title: 'AI Integration',
                  description: 'Personalized guidance using modern technology adapted for Africa'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200"
                >
                  <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Join Africa&apos;s Financial Revolution</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of the movement to empower millions across Africa with financial knowledge and tools for prosperity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleDownloadWhitepaper}
                disabled={downloadStatus === 'preparing' || downloadStatus === 'downloading'}
                className={`px-8 py-4 rounded-lg font-semibold transition-colors flex items-center shadow-md hover:shadow-lg min-w-[220px] justify-center ${
                  downloadStatus === 'success' 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : downloadStatus === 'error'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-white text-orange-600 hover:bg-gray-100 disabled:opacity-70'
                }`}
              >
                {downloadStatus === 'preparing' && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Preparing PDF...
                  </>
                )}
                {downloadStatus === 'downloading' && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Downloading...
                  </>
                )}
                {downloadStatus === 'success' && (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Downloaded!
                  </>
                )}
                {downloadStatus === 'error' && (
                  <>
                    <X className="mr-2 h-4 w-4" />
                    Try Again
                  </>
                )}
                {downloadStatus === 'idle' && (
                  <>
                    Download Full Whitepaper
                    <Download className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
              {isSignedIn ? (
                <Link href="/dashboard" className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-orange-600 transition-colors flex items-center">
                  Partner Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-orange-600 transition-colors flex items-center">
                    Partner Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </SignInButton>
              )}
            </div>
            
            
          </motion.div>
        </div>
      </section>

      {/* Feedback Button */}
      <FeedbackButton page="whitepaper" color="orange" />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">FinEdge Africa</span>
              </div>
              <p className="text-gray-400 mb-4">Empowering Africa&apos;s financial future through innovative technology and education.</p>
              <div className="flex space-x-4">
                <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Whitepaper</Link></li>
                <li><Link href="/technical-plan" className="hover:text-white transition-colors">Technical Plan</Link></li>
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Partnership</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/sign-in" className="hover:text-white transition-colors">Partner Login</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/investors" className="hover:text-white transition-colors">Investor Relations</Link></li>
                <li><Link href="/partners" className="hover:text-white transition-colors">Become a Partner</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2025 FinEdge Africa. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}