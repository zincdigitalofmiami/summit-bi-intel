# Summit BI Intel - Marine Construction Business Intelligence Platform

A comprehensive business intelligence platform specifically designed for marine construction companies, with a focus on the Panama City, FL market.

## 🚀 Features

### Core Functionality

- **User Authentication**: Magic link and password authentication with role-based access (Admin/User)
- **Project Management**: Full CRM system for managing marine construction projects
- **Lead Management**: Advanced lead tracking with enrichment capabilities
- **Client Management**: Comprehensive client database with analytics
- **Proposal System**: Automated proposal generation and e-signature workflows

### AI & Intelligence Features

- **AI Agent**: Intelligent business insights and recommendations based on your data
- **Lead Enrichment**: Automatic contact information enrichment using mock Clearbit-style data
- **Smart Analytics**: AI-powered analysis of business performance and market trends
- **Knowledge Base**: Sync and analyze business documentation

### Google Integrations

- **Google Analytics**: Website traffic and conversion tracking
- **Google Search Console**: SEO performance and search rankings
- **Google Ads**: PPC campaign performance and optimization insights

### Market Intelligence

- **Weather Monitoring**: Real-time NOAA weather data for Panama City, FL
- **Permit Tracking**: Panama City marine construction permit monitoring
- **Competitor Analysis**: Market intelligence and competitor tracking
- **WordPress Integration**: Blog content and lead generation from website

### Data Visualization

- **Interactive Charts**: Beautiful, responsive charts using Recharts
- **Dashboard Analytics**: Comprehensive business metrics and KPIs
- **Weather Maps**: Marine weather visualization
- **Performance Tracking**: Real-time business performance monitoring

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Vercel Postgres)
- **Authentication**: JWT with magic links
- **Charts**: Recharts library
- **Styling**: Tailwind CSS with Radix UI components
- **Deployment**: Vercel with automatic CI/CD

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd summit-bi-intel
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp env.example .env.local
   ```

   Configure the following critical variables:

   ```env
   # Database
   POSTGRES_PRISMA_URL=your_postgres_connection_string

   # Authentication
   JWT_SECRET=your_secure_jwt_secret

   # Google OAuth (for integrations)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

   # Email (for magic links)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Development**
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Vercel will automatically detect Next.js configuration

2. **Environment Variables**
   Set the following in Vercel dashboard:

   ```env
   POSTGRES_PRISMA_URL=your_production_database_url
   JWT_SECRET=your_secure_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ADMIN_SEED_TOKEN=your_admin_seed_token
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Production Features

- **Automatic SSL**: HTTPS enabled by default
- **Global CDN**: Fast content delivery worldwide
- **Serverless Functions**: Optimized API performance
- **Database**: Vercel Postgres for reliability
- **Analytics**: Built-in Vercel Analytics

## 📊 API Endpoints

### Authentication

- `POST /api/auth/login` - Send magic link
- `POST /api/auth/password` - Password authentication
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout

### Business Data

- `GET /api/projects` - Project management
- `GET /api/clients` - Client database
- `GET /api/leads` - Lead management
- `POST /api/leads/enrich` - Lead enrichment
- `GET /api/proposals` - Proposal management

### AI & Analytics

- `GET /api/agent/insights` - AI business insights
- `POST /api/knowledge/sync` - Knowledge base sync

### Google Integrations

- `GET /api/google/analytics` - Google Analytics data
- `GET /api/google/search-console` - Search Console data
- `GET /api/google/ads` - Google Ads performance

### Weather & Market Data

- `GET /api/weather/current` - Current weather
- `GET /api/weather/forecast` - Weather forecast
- `GET /api/market/panama-permits` - Permit tracking
- `GET /api/competitors` - Competitor data

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API rate limiting on all endpoints
- **CORS Protection**: Configured cross-origin policies
- **CSP Headers**: Content Security Policy implementation
- **Input Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM safeguards

## 🎨 User Interface

### Dashboard Features

- **Real-time Metrics**: Live business KPIs
- **Interactive Charts**: Responsive data visualization
- **Weather Integration**: Marine weather monitoring
- **Lead Pipeline**: Visual lead management
- **Project Timeline**: Construction project tracking

### Admin Features

- **User Management**: Admin panel for user administration
- **System Monitoring**: Health checks and diagnostics
- **Data Management**: Database seeding and management
- **Integration Setup**: Google OAuth and API configuration

## 🤖 AI Features

### Business Intelligence

- **Project Analysis**: Automated project performance insights
- **Lead Scoring**: AI-powered lead qualification
- **Market Trends**: Predictive market analysis
- **Competitor Monitoring**: Automated competitor analysis

### Lead Enrichment

- **Contact Information**: Automatic contact data enrichment
- **Company Intelligence**: Business information lookup
- **Social Media**: LinkedIn and social profile detection
- **Industry Classification**: Automated industry categorization

## 📱 Mobile Responsive

- **Responsive Design**: Works on all device sizes
- **Touch Optimized**: Mobile-friendly interactions
- **Progressive Web App**: Installable on mobile devices
- **Offline Capability**: Basic offline functionality

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting
npm run lint:fix     # Auto-fix linting issues
```

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks (if configured)

## 📈 Performance

- **Next.js Optimization**: Automatic code splitting and optimization
- **Image Optimization**: Built-in Next.js image optimization
- **API Optimization**: Efficient database queries with Prisma
- **Caching**: Strategic caching for improved performance

## 🐛 Troubleshooting

### Common Issues

**Database Connection Issues**

```bash
# Check database connection
npx prisma studio
```

**Build Failures**

```bash
# Clear cache and rebuild
rm -rf .next node_modules/.cache
npm install
npm run build
```

**Weather Data Not Loading**

- NOAA API may have CORS restrictions
- Check network connectivity
- Verify API endpoints are accessible

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is proprietary software developed for Summit Marine Development.

---

**Built with ❤️ for Summit Marine Development - Panama City, FL**
