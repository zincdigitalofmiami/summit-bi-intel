import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let dbStatus: string = "not_configured";
  try {
    // Lightweight query to verify connection (no migrations required)
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "operational";
  } catch {
    dbStatus = "error";
  }

  const healthCheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "0.1.0",
    environment: process.env.NODE_ENV || "development",
    services: {
      database: dbStatus,
      weather_api: "removed",
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
