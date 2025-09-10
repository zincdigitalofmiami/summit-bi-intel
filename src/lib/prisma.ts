import { PrismaClient } from "@prisma/client";

// Ensure Prisma can find a connection string in preview/prod even if the exact env var differs
if (!process.env.POSTGRES_PRISMA_URL) {
	const alt = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.PRISMA_DATABASE_URL;
	if (alt) process.env.POSTGRES_PRISMA_URL = alt;
}

declare global {
	var prismaGlobal: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.prismaGlobal || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prismaGlobal = prisma;


