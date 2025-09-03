# Project Phoenix - Claude Code Configuration

## Project Overview
African Financial Literacy & Investment Platform - A comprehensive financial literacy and investment platform specifically designed for Africa's emerging middle class, starting with Zambia.

## Co-Founders
- **Shummuel (65% equity)**: Vision, strategy, partnerships, content creation, investor relations
- **Winston (35% equity)**: Full-stack development, technical architecture, product development

## Key Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio
```

## Project Structure
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, Framer Motion
- **Authentication**: Clerk for partner login system
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Deployment**: Vercel (frontend), DigitalOcean/Railway (backend)

## Current Status
✅ **Phase 1 Complete**: Foundation & Landing (Weeks 1-2)
- Landing page with comprehensive whitepaper content
- Technical plan page with interactive roadmap
- Partner authentication system with Clerk
- Database setup with feedback system
- Beautiful, responsive design with smooth animations

## Next Steps
🔄 **Phase 2**: Backend Infrastructure (Weeks 2-4)
- Enhanced API development
- Advanced user management
- Data analytics integration
- Performance optimization

## Environment Setup
Requires `.env.local` with:
- Clerk authentication keys
- Database URL
- Other configuration variables

## Feedback System
- Floating feedback button on all pages for authenticated users
- Real-time feedback collection and storage
- Partner feedback review in dashboard

## Revenue Model
- **B2C**: Freemium SaaS (K50-100/month premium)
- **B2B**: Institutional licensing (K25,000-50,000/year)

## Success Metrics
- 100+ whitepaper downloads (MVP validation)
- 50+ beta app testers
- 70%+ onboarding completion
- 40%+ weekly active users

## Contact
Use the in-app feedback system for technical questions or partnership inquiries.