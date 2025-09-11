-- Performance indexes for Summit Marine Development app
-- These indexes optimize common query patterns

-- Lead indexes
CREATE INDEX IF NOT EXISTS idx_lead_status ON "Lead"(status);
CREATE INDEX IF NOT EXISTS idx_lead_source ON "Lead"(source);
CREATE INDEX IF NOT EXISTS idx_lead_created_at ON "Lead"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_lead_email ON "Lead"(email);

-- Project indexes
CREATE INDEX IF NOT EXISTS idx_project_status ON "Project"(status);
CREATE INDEX IF NOT EXISTS idx_project_type ON "Project"(type);
CREATE INDEX IF NOT EXISTS idx_project_created_at ON "Project"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_project_client ON "Project"(client);

-- Proposal indexes
CREATE INDEX IF NOT EXISTS idx_proposal_status ON "Proposal"(status);
CREATE INDEX IF NOT EXISTS idx_proposal_created_at ON "Proposal"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_proposal_amount ON "Proposal"(amount DESC);

-- Client indexes
CREATE INDEX IF NOT EXISTS idx_client_email ON "Client"(email);
CREATE INDEX IF NOT EXISTS idx_client_created_at ON "Client"("createdAt" DESC);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_project_status_created ON "Project"(status, "createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_lead_status_created ON "Lead"(status, "createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_proposal_status_created ON "Proposal"(status, "createdAt" DESC);

-- Note: Run this migration manually in production with:
-- npx prisma db execute --file ./prisma/migrations/add_performance_indexes.sql
