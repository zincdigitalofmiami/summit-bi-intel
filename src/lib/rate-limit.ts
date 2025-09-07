import type { NextRequest } from 'next/server';

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store for rate limiting
// In production, use Redis or similar
const store: RateLimitStore = {};

export class RateLimit {
  private limit: number;
  private windowMs: number;

  constructor(limit: number = 60, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  check(request: NextRequest): { success: boolean; remaining: number; resetTime: number } {
    const ip = this.getClientIp(request);
    const now = Date.now();
    
    // Clean up old entries
    this.cleanup(now);
    
    if (!store[ip]) {
      store[ip] = { count: 1, resetTime: now + this.windowMs };
      return { success: true, remaining: this.limit - 1, resetTime: store[ip].resetTime };
    }
    
    const entry = store[ip];
    
    // Check if window has expired
    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + this.windowMs;
      return { success: true, remaining: this.limit - 1, resetTime: entry.resetTime };
    }
    
    // Check if limit exceeded
    if (entry.count >= this.limit) {
      return { success: false, remaining: 0, resetTime: entry.resetTime };
    }
    
    entry.count++;
    return { success: true, remaining: this.limit - entry.count, resetTime: entry.resetTime };
  }
  
  private getClientIp(request: NextRequest): string {
    // Try various headers for client IP
    const forwarded = request.headers.get('x-forwarded-for');
    const real = request.headers.get('x-real-ip');
    const remote = request.headers.get('remote-addr');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    return real || remote || 'unknown';
  }
  
  private cleanup(now: number): void {
    Object.keys(store).forEach(ip => {
      if (store[ip].resetTime < now) {
        delete store[ip];
      }
    });
  }
}

// Pre-configured rate limiters
export const weatherApiLimit = new RateLimit(30, 60000); // 30 requests per minute
export const generalApiLimit = new RateLimit(100, 60000); // 100 requests per minute
