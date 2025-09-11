import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_request: NextRequest) {
	// Add security headers
	// const { pathname } = request.nextUrl;
	// TEMP: make entire site public (disable auth gate)
	const response = NextResponse.next();

	// Content Security Policy
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-eval' 'unsafe-inline'", // VChart needs unsafe-eval
		"style-src 'self' 'unsafe-inline'",
		"img-src 'self' data: https://www.zincdigital.co",
		"font-src 'self'",
		"connect-src 'self'",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"form-action 'self'",
	].join("; ");

	response.headers.set("Content-Security-Policy", csp);

	// Additional security headers
	response.headers.set("X-DNS-Prefetch-Control", "off");
	response.headers.set("X-Download-Options", "noopen");
	response.headers.set(
		"Strict-Transport-Security",
		"max-age=31536000; includeSubDomains",
	);
	response.headers.set("X-Robots-Tag", "noindex, nofollow");

	// Auth gate disabled temporarily

	return response;
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|logos/).*)",
	],
};
