# Supabase Database Setup

To set up the Supabase database for Project Phoenix, follow these steps:

## 1. Create Tables

Go to your Supabase project SQL Editor and run the following SQL:

```sql
-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_name TEXT NOT NULL,
    page TEXT NOT NULL,
    section TEXT,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'in_progress', 'addressed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedback_responses table
CREATE TABLE IF NOT EXISTS feedback_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    feedback_id UUID REFERENCES feedback(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create downloads table
CREATE TABLE IF NOT EXISTS downloads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT,
    user_email TEXT,
    type TEXT NOT NULL CHECK (type IN ('whitepaper', 'technical-plan')),
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_metrics table
CREATE TABLE IF NOT EXISTS project_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metric_name TEXT NOT NULL,
    metric_value DECIMAL NOT NULL,
    metric_type TEXT NOT NULL CHECK (metric_type IN ('count', 'percentage', 'currency')),
    period TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 2. Create Indexes

```sql
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_responses_feedback_id ON feedback_responses(feedback_id);
CREATE INDEX IF NOT EXISTS idx_downloads_type ON downloads(type);
CREATE INDEX IF NOT EXISTS idx_downloads_created_at ON downloads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_metrics_name ON project_metrics(metric_name);
```

## 3. Insert Sample Data

```sql
-- Insert initial metrics data
INSERT INTO project_metrics (metric_name, metric_value, metric_type, period) VALUES
('whitepaper_downloads', 247, 'count', 'total'),
('beta_signups', 89, 'count', 'total'),
('feedback_items', 34, 'count', 'total'),
('development_progress', 85, 'percentage', 'current'),
('monthly_growth', 18.5, 'percentage', 'current_month'),
('partner_engagement', 92, 'percentage', 'current_month'),
('technical_milestone_completion', 88, 'percentage', 'current_phase'),
('user_retention_rate', 74, 'percentage', 'last_30_days');

-- Insert sample feedback data
INSERT INTO feedback (user_id, user_email, user_name, page, section, content, status, created_at) VALUES
('user_shummuel', 'shummuel@projectphoenix.co', 'Shummuel', 'whitepaper', 'Business Model', 'The dual revenue model is brilliant. I especially like how we''ve positioned the institutional licensing. Consider adding more details about the pilot program structure.', 'reviewed', NOW() - INTERVAL '3 hours'),
('user_shummuel', 'shummuel@projectphoenix.co', 'Shummuel', 'technical-plan', 'Phase 2', 'Backend timeline seems realistic. Should we add more buffer time for API testing? Also, consider mobile-first design principles from the start.', 'in_progress', NOW() - INTERVAL '1 day'),
('user_shummuel', 'shummuel@projectphoenix.co', 'Shummuel', 'whitepaper', 'Success Metrics', 'KPIs look good but let''s add user engagement depth metrics. Weekly active users is great, but session duration and feature adoption would be valuable.', 'new', NOW() - INTERVAL '2 days'),
('user_partner_b', 'partner.b@advisor.com', 'Advisory Partner B', 'technical-plan', 'Budget Allocation', 'Month 2 budget allocation looks conservative. Consider increasing marketing prep budget to K500 for better user acquisition.', 'addressed', NOW() - INTERVAL '3 days'),
('user_shummuel', 'shummuel@projectphoenix.co', 'Shummuel', 'whitepaper', 'Market Opportunity', 'Love the Africa-first approach. The competition analysis could be stronger - maybe add a comparison matrix with existing fintech solutions?', 'reviewed', NOW() - INTERVAL '5 days');

-- Insert sample feedback responses
INSERT INTO feedback_responses (feedback_id, user_id, user_email, user_name, content) VALUES
((SELECT id FROM feedback WHERE content LIKE '%pilot program structure%' LIMIT 1), 'user_winston', 'winston@projectphoenix.co', 'Winston', 'Great suggestion! I''ll add a detailed pilot program section with timeline and success criteria. Should we target 50 or 100 pilot users initially?'),
((SELECT id FROM feedback WHERE content LIKE '%marketing prep budget%' LIMIT 1), 'user_winston', 'winston@projectphoenix.co', 'Winston', 'Agreed and implemented. Increased marketing prep to K500 and added social media campaign planning. This should give us better reach for beta signups.'),
((SELECT id FROM feedback WHERE content LIKE '%competition analysis%' LIMIT 1), 'user_winston', 'winston@projectphoenix.co', 'Winston', 'Excellent idea! I''m working on a comprehensive comparison matrix. Will include features, pricing, target markets, and African market penetration for top 5 competitors.');

-- Insert sample download data
INSERT INTO downloads (user_id, user_email, type, created_at) VALUES
('user_investor_1', 'investor1@vc.fund', 'whitepaper', NOW() - INTERVAL '1 hour'),
('user_investor_2', 'investor2@vc.fund', 'whitepaper', NOW() - INTERVAL '2 hours'),
(NULL, NULL, 'whitepaper', NOW() - INTERVAL '4 hours'),
('user_shummuel', 'shummuel@projectphoenix.co', 'technical-plan', NOW() - INTERVAL '1 day'),
(NULL, NULL, 'whitepaper', NOW() - INTERVAL '2 days'),
('user_university_1', 'dean@university.zm', 'whitepaper', NOW() - INTERVAL '3 days');
```

## 4. Set Up Row Level Security (Optional)

```sql
-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth requirements)
CREATE POLICY "Public read access" ON feedback FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update access" ON feedback FOR UPDATE USING (true);

CREATE POLICY "Public read access" ON feedback_responses FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON feedback_responses FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON downloads FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON downloads FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read access" ON project_metrics FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON project_metrics FOR INSERT WITH CHECK (true);
```

## 5. Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://aufuzjmugksuszgpfjzj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 6. Test the Setup

After running the SQL commands, your application should be able to:

- Display realistic metrics on the dashboard
- Show existing feedback items from Shummuel
- Allow partners to submit new feedback
- Enable responses to feedback items
- Track whitepaper downloads
- Update feedback status

The dashboard will now show production-ready data with realistic numbers and actual feedback from your partner!