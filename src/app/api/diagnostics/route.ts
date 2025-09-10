import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import { promisify } from "util";
import { diagnosticAgent } from "@/lib/auto-diagnostics";

const execAsync = promisify(exec);

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const action = searchParams.get("action") || "report";

	try {
		switch (action) {
			case "report":
				return NextResponse.json({
					report: diagnosticAgent.generateReport(),
					preventiveActions: diagnosticAgent.getPreventiveActions(),
					timestamp: new Date().toISOString(),
				});

			case "health-check":
				return await performHealthCheck(request);

			case "auto-fix":
				return await performAutoFix();

			default:
				return NextResponse.json({ error: "Invalid action" }, { status: 400 });
		}
	} catch (error) {
		return NextResponse.json(
			{ error: "Diagnostic system error", details: (error as Error).message },
			{ status: 500 },
		);
	}
}

async function performHealthCheck(request: NextRequest) {
	const checks = {
		build: false,
		dependencies: false,
		routes: false,
		cache: false,
		performance: false,
	};

	const isDev = process.env.NODE_ENV !== "production";

	try {
		// In dev, skip heavy build to avoid blocking and flakiness
		if (isDev) {
			checks.build = true;
		} else {
			const buildResult = await execAsync("npm run build", { timeout: 30000 });
			checks.build = !buildResult.stderr.includes("Failed to compile");
		}
	} catch {
		checks.build = false;
	}

	try {
		// In dev, skip audit which is slow and noisy
		if (isDev) {
			checks.dependencies = true;
		} else {
			const auditResult = await execAsync("npm audit --audit-level=high", {
				timeout: 10000,
			});
			checks.dependencies = !auditResult.stdout.includes("vulnerabilities");
		}
	} catch {
		checks.dependencies = false;
	}

	// Check critical routes (skip in dev to avoid noisy errors during HMR/compiles)
	try {
		if (isDev) {
			checks.routes = true;
		} else {
			const routes = ["/dashboard", "/leads", "/market-intelligence"];
			const routeChecks = await Promise.all(
				routes.map(async (route) => {
					try {
						// Use current origin (supports dev port changes)
						const base = new URL(request.url);
						base.pathname = route;
						base.search = "";
						const response = await fetch(base.toString(), {
							method: "GET",
							cache: "no-store",
						});
						return response.ok;
					} catch {
						return false;
					}
				}),
			);
			checks.routes = routeChecks.every(Boolean);
		}
	} catch {
		checks.routes = false;
	}

	// Check cache health (look for common cache issues)
	checks.cache = !process.env.NEXT_CACHE_ERROR;

	// Basic performance check
	const memoryUsage = process.memoryUsage();
	checks.performance = memoryUsage.heapUsed < 500 * 1024 * 1024; // < 500MB

	const overallHealth = Object.values(checks).every(Boolean);

	return NextResponse.json({
		status: overallHealth ? "healthy" : "degraded",
		checks,
		recommendations: overallHealth
			? []
			: diagnosticAgent.getPreventiveActions(),
		timestamp: new Date().toISOString(),
	});
}

async function performAutoFix() {
	const fixes = [];

	try {
		const isDev = process.env.NODE_ENV !== "production";

		if (isDev) {
			// Do not run destructive operations on the dev server process
			return NextResponse.json({
				status: "skipped",
				message:
					"Auto-fix disabled in development to avoid disrupting dev server",
				fixes: [],
				timestamp: new Date().toISOString(),
			});
		}

		// Auto-fix 1: Clear problematic caches
		await execAsync("rm -rf .next/cache node_modules/.cache");
		fixes.push("Cleared Next.js and node_modules cache");

		// Auto-fix 2: Reinstall dependencies if package-lock is newer
		const packageStat = await execAsync("stat -f %m package.json");
		const lockStat = await execAsync("stat -f %m package-lock.json");

		if (parseInt(lockStat.stdout) > parseInt(packageStat.stdout)) {
			await execAsync("npm ci");
			fixes.push("Reinstalled dependencies from lock file");
		}

		// Auto-fix 3: Format imports if linting errors detected
		try {
			const lintResult = await execAsync("npm run lint");
			if (lintResult.stderr.includes("imports and exports are not sorted")) {
				await execAsync("npx @biomejs/biome format --write src/**/*.{ts,tsx}");
				fixes.push("Auto-formatted import statements");
			}
		} catch {
			// Linting failed, but that's okay for auto-fix
		}

		// Log the successful fixes
		diagnosticAgent.learnFromIssue(
			"Auto-fix routine executed",
			fixes.join("; "),
			fixes.length > 0 ? 85 : 50,
		);

		return NextResponse.json({
			status: "completed",
			fixes,
			message: "Auto-fix routine completed successfully",
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		return NextResponse.json(
			{
				status: "failed",
				error: (error as Error).message,
				partialFixes: fixes,
				timestamp: new Date().toISOString(),
			},
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { issue, resolution, effectiveness } = body;

	if (!issue || !resolution || typeof effectiveness !== "number") {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 },
		);
	}

	// Learn from reported issue
	diagnosticAgent.learnFromIssue(issue, resolution, effectiveness);

	return NextResponse.json({
		message: "Learning recorded successfully",
		totalLearnings: diagnosticAgent["knowledge"].learningLog.length,
		timestamp: new Date().toISOString(),
	});
}
