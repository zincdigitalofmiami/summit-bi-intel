import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Add security headers
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith('/api/');
  const isPublic = pathname.startsWith('/auth/login') || pathname.startsWith('/auth/forgot') || pathname.startsWith('/auth/reset') || pathname === '/favicon.ico' || pathname.startsWith('/_next') || pathname.startsWith('/logos/') || pathname.startsWith('/public/');
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
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  
  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');

  // Auth gate for app pages (not API, not public login)
  if (!isApi && !isPublic) {
    const token = request.cookies.get('auth')?.value;
    if (!token) {
      const url = new URL('/auth/login', request.url);
      return NextResponse.redirect(url);
    }
  }
  
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
    '/((?!api|_next/static|_next/image|favicon.ico|logos/).*)',
  ],
};
