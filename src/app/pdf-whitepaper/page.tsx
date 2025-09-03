import { Target, Users, TrendingUp, Shield, Globe, CheckCircle } from 'lucide-react'

export default function PDFWhitepaper() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-sans">
      {/* Header */}
      <div className="text-center mb-12 border-b-2 border-orange-500 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tradvest
        </h1>
        <h2 className="text-2xl text-orange-600 mb-4">
          African Financial Literacy Platform
        </h2>
        <p className="text-lg text-gray-600">
          Empowering Africa&apos;s Financial Future through Technology and Education
        </p>
        <div className="mt-4 text-sm text-gray-500">
          Generated on {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Executive Summary */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Executive Summary
        </h2>
        <p className="text-lg mb-4 leading-relaxed">
          Tradvest is a comprehensive financial literacy and investment platform specifically designed for Africa&apos;s emerging middle class, starting with Zambia. Our mission is to create a financially secure middle-income group for the next generation while addressing poor investment planning among middle-aged adults to elderly populations across Africa.
        </p>
        <p className="text-lg leading-relaxed">
          The platform combines educational content, goal-setting tools, and simplified investment guidance through a dual revenue model: individual SaaS subscriptions (B2C) and institutional licensing (B2B).
        </p>
      </section>

      {/* Mission Statement */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Mission Statement
        </h2>
        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
          <p className="text-lg font-medium text-orange-800 mb-4">
            To create a financially secure middle-income group for the next generation while addressing poor investment planning among middle-aged adults to elderly populations across Africa.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Targeted Education</h3>
            <p className="text-gray-600 text-sm">Financial literacy tailored to African economic realities and cultural contexts.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Inclusive Access</h3>
            <p className="text-gray-600 text-sm">Simplified investment platforms designed for emerging market users.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Wealth Building</h3>
            <p className="text-gray-600 text-sm">Long-term financial planning and retirement strategies across demographics.</p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Problem Statement
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Target Challenges</h3>
            <ul className="space-y-3">
              {[
                'Limited financial literacy education tailored to African economic realities',
                'Complex investment platforms not designed for emerging market users',
                'Lack of culturally relevant financial guidance and scenarios',
                'Limited access to affordable, trustworthy financial advice',
                'Poor retirement and long-term financial planning',
                'Disconnect between traditional banking and digital-native users'
              ].map((challenge, index) => (
                <li key={index} className="flex items-start">
                  <Shield className="w-4 h-4 text-red-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Market Opportunity</h3>
            <ul className="space-y-3">
              {[
                'Africa&apos;s growing middle class seeking financial empowerment',
                'Increasing smartphone penetration and digital payment adoption',
                'Government initiatives promoting financial inclusion',
                'Limited competition in African-focused fintech education space'
              ].map((opportunity, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Dual Revenue Model
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-orange-800">Individual SaaS (B2C)</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-sm">Freemium model with basic financial education</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-sm">Premium subscriptions: K50-100/month</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-sm">AI-powered personalized investment guidance</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-sm">Goal tracking and portfolio simulation tools</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">Institutional Licensing (B2B)</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm">Enterprise dashboards for universities, NGOs, employers</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm">Custom programs: K25,000-50,000/year</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm">White-label solutions for banks</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm">Corporate training and analytics packages</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Revenue Projections</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Year 1</h4>
              <p className="text-sm text-gray-600">Focus on user acquisition and product validation</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Year 2-3</h4>
              <p className="text-sm text-gray-600">Target profitability through institutional clients</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Revenue Target</h4>
              <p className="text-sm text-gray-600">5-10 licenses = K300K+ revenue</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Target Audience
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Young Professionals (25-35)</h3>
            <p className="text-gray-600 text-sm">Starting careers, learning investment basics</p>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Established Middle Class (35-50)</h3>
            <p className="text-gray-600 text-sm">Planning retirement, wealth building</p>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Students & Early Career (18-25)</h3>
            <p className="text-gray-600 text-sm">Building financial foundations</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Institutional Clients</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2">
              <li>• Universities offering financial literacy programs</li>
              <li>• NGOs focused on economic empowerment</li>
            </ul>
            <ul className="space-y-2">
              <li>• Employers providing financial wellness benefits</li>
              <li>• Microfinance institutions expanding digital services</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Core Platform Features
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Intelligent Onboarding',
              description: 'Financial literacy assessment, risk evaluation, and goal setting with culturally relevant scenarios.',
              icon: Target
            },
            {
              title: 'Educational Hub',
              description: 'Bite-sized learning modules, local success stories, and gamified progress tracking.',
              icon: Users
            },
            {
              title: 'Goal Setting & Tracking',
              description: 'SMART financial goals with visual progress tracking and personalized milestones.',
              icon: CheckCircle
            },
            {
              title: 'Portfolio Simulator',
              description: 'Paper trading with ZMW/USD, investment recommendations based on risk profiles.',
              icon: TrendingUp
            },
            {
              title: 'AI-Powered Insights',
              description: 'Personalized financial advice and investment suggestions for African markets.',
              icon: Shield
            },
            {
              title: 'Multi-Platform Access',
              description: 'Mobile app and web platform with institutional dashboards and analytics.',
              icon: Globe
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <feature.icon className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Technical Architecture
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="w-5 h-5 text-orange-600 mr-2" />
              Frontend
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Mobile:</strong> React Native with Expo</li>
              <li>• <strong>Web:</strong> Next.js 14 with Tailwind CSS</li>
              <li>• <strong>State:</strong> Redux Toolkit</li>
              <li>• <strong>UI/UX:</strong> African-themed, multi-language</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="w-5 h-5 text-blue-600 mr-2" />
              Backend
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Framework:</strong> Django REST Framework</li>
              <li>• <strong>Database:</strong> PostgreSQL + Redis</li>
              <li>• <strong>Auth:</strong> JWT with refresh tokens</li>
              <li>• <strong>Security:</strong> HTTPS, rate limiting</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
              Infrastructure
            </h3>
            <ul className="space-y-2 text-sm">
              <li>• <strong>Hosting:</strong> DigitalOcean/Railway</li>
              <li>• <strong>Data:</strong> Twelve Data API</li>
              <li>• <strong>Payments:</strong> Mobile money integration</li>
              <li>• <strong>Analytics:</strong> Mixpanel</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Partnership Structure */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Partnership Structure
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Co-Founder Equity</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Shummuel (65% equity)</p>
                <p className="text-gray-600 text-sm">Vision, strategy, partnerships, content creation, investor relations</p>
              </div>
              <div>
                <p className="font-medium">Winston (35% equity)</p>
                <p className="text-gray-600 text-sm">Full-stack development, technical architecture, product development</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Financial Commitment</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Months 1-3:</span>
                <span className="font-medium">K1,200/month each</span>
              </div>
              <div className="flex justify-between">
                <span>Months 4-6:</span>
                <span className="font-medium">K1,500/month each</span>
              </div>
              <div className="flex justify-between">
                <span>Month 7+:</span>
                <span className="font-medium">K2,000/month each</span>
              </div>
              <div className="border-t pt-2 mt-3">
                <div className="flex justify-between">
                  <span>Time Commitment:</span>
                  <span className="font-medium">25-30 hours/week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Timeline */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Development Timeline
        </h2>
        
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Phase 1: Foundation & Landing (Weeks 1-2) ✓</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Landing page development and whitepaper creation</li>
              <li>• Brand identity and domain setup</li>
              <li>• Technical architecture planning</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Phase 2: Backend Development (Weeks 2-4)</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• User authentication and management system</li>
              <li>• Database design and API development</li>
              <li>• Security implementation and compliance setup</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">Phase 3: Mobile MVP (Weeks 4-8)</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• React Native app development</li>
              <li>• Core feature implementation</li>
              <li>• Testing and beta user feedback integration</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Phase 4: Launch Preparation (Week 8+)</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• App store submissions and beta testing</li>
              <li>• Pilot user acquisition (50-100 testers)</li>
              <li>• Performance optimization and bug fixes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Success Metrics & KPIs
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MVP Validation</h3>
            <ul className="space-y-2 text-sm">
              <li>• 100+ whitepaper downloads within first month</li>
              <li>• 50+ beta app testers with 70%+ onboarding completion</li>
              <li>• 40%+ weekly active users among pilot group</li>
              <li>• Average session time: 5+ minutes</li>
              <li>• User feedback score: 4.0+ stars</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Growth Targets</h3>
            <ul className="space-y-2 text-sm">
              <li>• Month 6: 500+ registered users</li>
              <li>• Year 1: 2,000+ active users, 1 institutional client</li>
              <li>• Year 2: 10,000+ users, 5-10 institutional partnerships</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Competitive Advantages
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <ul className="space-y-3">
            {[
              'African-First Design: Built specifically for African economic realities and cultural contexts',
              'Dual Model: Combining individual education with institutional partnerships'
            ].map((advantage, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{advantage}</span>
              </li>
            ))}
          </ul>
          <ul className="space-y-3">
            {[
              'Local Expertise: Founders understand both technical requirements and market needs',
              'AI Integration: Personalized guidance using modern technology'
            ].map((advantage, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{advantage}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Risk Management */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Risk Management
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Identified Risks & Mitigation</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-red-300 pl-4">
                <h4 className="font-medium text-red-800">Technical Complexity</h4>
                <p className="text-sm text-gray-600 mt-1">Modular architecture allows feature pivoting</p>
              </div>
              <div className="border-l-4 border-red-300 pl-4">
                <h4 className="font-medium text-red-800">Market Validation</h4>
                <p className="text-sm text-gray-600 mt-1">Pilot testing with target users</p>
              </div>
              <div className="border-l-4 border-red-300 pl-4">
                <h4 className="font-medium text-red-800">Financial Constraints</h4>
                <p className="text-sm text-gray-600 mt-1">Lean development and graduated investment</p>
              </div>
              <div className="border-l-4 border-red-300 pl-4">
                <h4 className="font-medium text-red-800">Regulatory Compliance</h4>
                <p className="text-sm text-gray-600 mt-1">Early legal review and compliance integration</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Market Entry Strategy</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our phased approach minimizes risk while maximizing learning and adaptation opportunities.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Start with Zambian market for focused validation</li>
              <li>• Build partnerships with local institutions</li>
              <li>• Gradual expansion to neighboring African markets</li>
              <li>• Continuous user feedback integration</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 border-b border-gray-200 pb-2">
          Conclusion
        </h2>
        
        <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
          <p className="text-lg leading-relaxed mb-4">
            Tradvest represents a significant opportunity to create lasting impact on financial literacy across Africa while building a sustainable, scalable business. Our African-first approach, combined with modern technology and deep local expertise, positions us uniquely to address the critical gap in financial education and investment access.
          </p>
          <p className="text-lg leading-relaxed">
            With our dual revenue model, strong partnership foundation, and clear development roadmap, we are well-positioned to expand continent-wide over the next 3-5 years, ultimately empowering millions of Africans to achieve financial security and prosperity.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="text-center border-t-2 border-orange-500 pt-8">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">Contact Information</h2>
        <p className="text-lg mb-2">Tradvest - African Financial Literacy Platform</p>
        <p className="text-gray-600 mb-4">For partnership inquiries and investment opportunities</p>
        <div className="text-sm text-gray-500">
          <p>© 2025 Tradvest. All rights reserved.</p>
          <p>Confidential and Proprietary Information</p>
        </div>
      </section>
    </div>
  )
}