import { NextResponse } from "next/server";

export async function GET() {
  const healthCheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "0.1.0",
    environment: process.env.NODE_ENV || "development",
    services: {
      database: "not_configured", // Will update when we add Vercel Postgres
      weather_api: "operational",
      market_intelligence: "operational",
      proposals: "operational"
    },
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
    }
  };

  return NextResponse.json(healthCheck);
}
