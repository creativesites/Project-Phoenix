# Project Phoenix - African Financial Literacy Platform

A comprehensive financial literacy and investment platform specifically designed for Africa's emerging middle class, starting with Zambia.

## 🌟 Features

### Public Pages
- **Whitepaper/Landing Page**: Comprehensive overview of the platform's mission, business model, and impact
- **Technical Plan**: Detailed 3-phase development roadmap with technical architecture
- Beautiful, responsive design with smooth animations
- Modern UI with African-themed color palette

### Partner Features
- **Authentication**: Secure partner login system powered by Clerk
- **Dashboard**: Real-time metrics, progress tracking, and collaboration tools
- **Feedback System**: Interactive feedback collection on all pages
- **Progress Monitoring**: Development phase tracking and milestone visualization

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Prisma** - Type-safe ORM
- **SQLite** - Local development database
- **Next.js API Routes** - Serverless functions

### Authentication
- **Clerk** - Complete authentication solution
- User management and protected routes
- Partner-specific access controls

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Project-Phoenix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file with your Clerk credentials:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
   CLERK_SECRET_KEY=your_secret_key_here
   
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   
   DATABASE_URL="file:./dev.db"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🗂️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── feedback/      # Feedback system endpoints
│   ├── dashboard/         # Partner dashboard
│   ├── sign-in/          # Authentication pages
│   ├── sign-up/
│   ├── technical-plan/    # Technical roadmap page
│   ├── layout.tsx         # Root layout with Clerk provider
│   └── page.tsx           # Main whitepaper/landing page
├── components/            # Reusable React components
│   └── FeedbackButton.tsx # Interactive feedback system
├── lib/                   # Utility functions
│   └── prisma.ts          # Database connection
└── middleware.ts          # Clerk authentication middleware

prisma/
└── schema.prisma          # Database schema
```

## 🎯 Core Features

### 1. Comprehensive Whitepaper
- Mission and vision for African financial literacy
- Detailed business model (B2C + B2B)
- Market analysis and opportunity assessment
- Technical architecture overview
- Partnership structure and timeline
- Success metrics and KPIs

### 2. Technical Roadmap
- 3-phase development plan
- Interactive phase selection
- Technology stack details
- Budget allocation breakdown
- Risk management strategy
- Success metrics tracking

### 3. Partner Collaboration
- Secure authentication system
- Real-time project metrics
- Feedback collection and management
- Progress monitoring dashboard
- Team collaboration tools

### 4. Feedback System
- Floating feedback button on all pages
- Page-specific feedback collection
- Real-time submission and storage
- Partner feedback review system
- Status tracking (new, reviewed, addressed)

## 🔧 Development Phases

### Phase 1: Foundation & Landing (Weeks 1-2) ✅
- [x] Next.js website with Tailwind CSS
- [x] Whitepaper content creation
- [x] Authentication system setup
- [x] Basic feedback system

### Phase 2: Backend Infrastructure (Weeks 2-4)
- [ ] Enhanced API development
- [ ] Advanced user management
- [ ] Data analytics integration
- [ ] Performance optimization

### Phase 3: Mobile MVP (Weeks 4-8)
- [ ] React Native app development
- [ ] Mobile-optimized features
- [ ] Cross-platform synchronization
- [ ] Beta testing preparation

## 🎨 Design Philosophy

- **African-First**: Built specifically for African economic realities
- **Premium Feel**: Modern, sleek, and professional design
- **Accessibility**: Responsive design for all devices
- **Performance**: Optimized loading and smooth animations
- **User-Centric**: Intuitive navigation and clear information hierarchy

## 📊 Success Metrics

### MVP Validation
- 100+ whitepaper downloads
- 50+ beta app testers
- 70%+ onboarding completion
- 40%+ weekly active users

### Growth Targets
- Month 6: 500+ registered users
- Year 1: 2,000+ active users, 1 institutional client
- Year 2: 10,000+ users, 5-10 institutional partnerships

## 🤝 Partnership Structure

- **Shummuel (65% equity)**: Vision, strategy, partnerships, content creation
- **Winston (35% equity)**: Full-stack development, technical architecture

## 📈 Revenue Model

### Individual SaaS (B2C)
- Freemium model with basic financial education
- Premium subscriptions: K50-100/month
- AI-powered personalized guidance

### Institutional Licensing (B2B)
- Enterprise dashboards: K25,000-50,000/year
- White-label solutions for banks
- Corporate training packages

## 🔒 Security & Compliance

- HTTPS enforcement
- Rate limiting and input validation
- Financial data encryption
- GDPR-compliant data handling
- Secure authentication with Clerk

## 🚀 Deployment

The application is designed to be deployed on:
- **Frontend**: Vercel (automatic deployments)
- **Backend**: DigitalOcean or Railway
- **Database**: PostgreSQL in production

## 📞 Support

For technical questions or partnership inquiries, please use the feedback system within the application or contact the development team.

## 📜 License

This project is proprietary and confidential. All rights reserved.

---

**Project Phoenix** - Empowering Africa's Financial Future through Technology and Education