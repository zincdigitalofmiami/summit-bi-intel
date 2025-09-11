import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
  details?: any;
}

/**
 * Centralized error handler for API routes
 */
export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          error: 'DUPLICATE_ENTRY',
          message: 'A record with this information already exists',
          details: error.meta,
        },
        { status: 409 }
      );
    }
    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          error: 'NOT_FOUND',
          message: 'The requested record was not found',
          details: error.meta,
        },
        { status: 404 }
      );
    }
    if (error.code === 'P2003') {
      return NextResponse.json(
        {
          error: 'FOREIGN_KEY_CONSTRAINT',
          message: 'Cannot perform this operation due to related records',
          details: error.meta,
        },
        { status: 400 }
      );
    }
  }

  // Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json(
      {
        error: 'VALIDATION_ERROR',
        message: 'Invalid data provided',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 400 }
    );
  }

  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return NextResponse.json(
      {
        error: 'NETWORK_ERROR',
        message: 'Failed to connect to external service',
      },
      { status: 503 }
    );
  }

  // Rate limit errors
  if (error instanceof Error && error.message.includes('rate limit')) {
    return NextResponse.json(
      {
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many requests. Please try again later.',
      },
      { status: 429 }
    );
  }

  // Generic error
  if (error instanceof Error) {
    return NextResponse.json(
      {
        error: 'INTERNAL_SERVER_ERROR',
        message: process.env.NODE_ENV === 'production' 
          ? 'An unexpected error occurred' 
          : error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }

  // Unknown error
  return NextResponse.json(
    {
      error: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
    },
    { status: 500 }
  );
}

/**
 * Wraps an async handler with error handling
 */
export function withErrorHandler<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  }) as T;
}
