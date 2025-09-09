# Summit BI Intel - Vercel Deployment Guide

## 🚀 Deployment Architecture

### Production Environment
- **Platform**: Vercel (Recommended)
- **Database**: Vercel Postgres
- **Storage**: Vercel Blob
- **Monitoring**: Sentry + Vercel Analytics
- **CDN**: Vercel Edge Network

## 🔧 Environment Setup

### 1. Connect to Vercel & Install CLI
First, connect your Git repository (e.g., GitHub) to Vercel to enable automated CI/CD.

1.  Go to the [Vercel Dashboard](https://vercel.com/new) and import the project from your Git provider.
2.  Vercel will automatically detect that it's a Next.js project.
3.  During setup, you can configure the environment variables listed in `env.example`.

For local development and CLI usage, install the Vercel CLI and link your project.
```bash
# Install Vercel CLI
npm i -g vercel

# Link project to Vercel
vercel link

# Pull down environment variables for local use
vercel env pull .env.local
```

### 2. Required Environment Variables
Copy `env.example` to `.env.local` and configure:

**Critical Variables:**
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - For Google integrations
- `POSTGRES_URL` - Vercel Postgres connection
- `JWT_SECRET` - For secure proposal tokens
- `SMTP_*` - Email configuration

### 3. Database Setup
```sql
-- Vercel Postgres tables (auto-created via API)
CREATE TABLE IF NOT EXISTS market_permits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source VARCHAR(50) NOT NULL,
  permit_id VARCHAR(100) NOT NULL,
  project_type VARCHAR(50) NOT NULL,
  description TEXT,
  applicant VARCHAR(200),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  website VARCHAR(500),
  licensing_status VARCHAR(20),
  last_updated TIMESTAMP DEFAULT NOW()
);
```

## 🛡️ Security & Compliance

### Security Headers
- **CSP**: Content Security Policy configured
- **HSTS**: HTTP Strict Transport Security
- **X-Frame-Options**: DENY (prevents clickjacking)
- **X-Content-Type-Options**: nosniff

### Data Protection
- **JWT tokens** for secure proposal signing
- **Rate limiting** on all API endpoints
- **Input validation** with Zod schemas
- **CORS** properly configured

## 🔄 CI/CD Pipeline

### Automated Workflows
1. **Quality Gate** - PR checks (linting, tests, security)
2. **Continuous Integration** - Build and test on push
3. **Deployment** - Auto-deploy to Vercel on main branch
4. **Security Scanning** - Dependency audits and vulnerability checks

### Deployment Safety
- **Preview deployments** for all PRs
- **Production deployment** only after quality gate
- **Rollback capability** via Vercel dashboard
- **Health checks** at `/api/health`

## 📊 Monitoring & Observability

### Application Monitoring
- **Health endpoint**: `/api/health`
- **Error tracking**: Sentry integration ready
- **Performance metrics**: Vercel Analytics
- **API monitoring**: Built-in rate limiting

### Business Intelligence
- **Market data refresh**: Automated via cron
- **Competitor tracking**: Real-time updates
- **Weather alerts**: NOAA integration with fallbacks
- **Proposal analytics**: Usage tracking

## 🚀 Deployment Commands

### Development
```bash
npm run dev          # Local development
npm run build        # Production build test
npm run lint         # Code quality check
```

### Production
```bash
vercel --prod        # Deploy to production
vercel logs --prod   # View production logs
vercel env ls        # List environment variables
```

### Database Management
```bash
# Connect to Vercel Postgres
vercel postgres connect

# Run migrations
npm run db:migrate   # (when implemented)
```

## 🔍 Health Monitoring

### Endpoints
- `GET /api/health` - Application health status
- `GET /api/market/panama-permits/demo` - Market data test
- `GET /api/weather/alerts` - Weather service test

### Expected Response Times
- **Dashboard**: < 2s initial load
- **Market Intelligence**: < 3s with data
- **API endpoints**: < 1s response time
- **Weather data**: < 5s (external dependency)

## 🎯 Production Checklist

### Before Deployment
- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] Google OAuth credentials set up
- [ ] SMTP configuration tested
- [ ] Domain DNS configured
- [ ] SSL certificate verified

### Post-Deployment
- [ ] Health check passing
- [ ] All pages loading correctly
- [ ] Market intelligence data flowing
- [ ] Proposal system functional
- [ ] Weather alerts displaying
- [ ] Error monitoring active

## 🆘 Troubleshooting

### Common Issues
1. **Build failures**: Check Node.js version (requires 18+)
2. **Database errors**: Verify Postgres connection string
3. **OAuth issues**: Check redirect URI configuration
4. **API timeouts**: Review function timeout settings
5. **Style issues**: Clear .next cache and rebuild

### Emergency Contacts
- **Technical**: Linear tickets + Codegen assistance
- **Deployment**: Vercel dashboard + GitHub Actions
- **Monitoring**: Sentry alerts + health endpoint
