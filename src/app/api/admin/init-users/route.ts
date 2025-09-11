import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export const runtime = "nodejs";
export const maxDuration = 30;

// Simple GET endpoint that can be called directly from browser
export async function GET(request: NextRequest) {
  try {
    // Check for token in query params for easier access
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const tokenEnv = process.env.ADMIN_SEED_TOKEN || "";
    
    // Allow if no token is configured or token matches
    if (tokenEnv && token !== tokenEnv) {
      return NextResponse.json({ error: "unauthorized - invalid token" }, { status: 401 });
    }

    // User accounts to set up with strong passwords
    const users = [
      {
        email: 'jose@summitmarinedevelopment.com',
        name: 'Jose Morales',
        password: 'SummitMarine2025!',
        role: Role.ADMIN,
      },
      {
        email: 'kirk@zincdigital.co',
        name: 'Kirk',
        password: 'ZincDigital2025!',
        role: Role.ADMIN,
      },
    ];

    const results = [];

    for (const userData of users) {
      try {
        // Hash the password with bcrypt
        const passwordHash = await bcrypt.hash(userData.password, 10);

        // Create or update the user
        const user = await prisma.user.upsert({
          where: { email: userData.email },
          create: {
            email: userData.email,
            name: userData.name,
            passwordHash,
            role: userData.role,
            onboarded: true,
            lastLoginAt: null,
          },
          update: {
            name: userData.name,
            passwordHash,
            role: userData.role,
            onboarded: true,
          },
        });

        results.push({
          success: true,
          email: user.email,
          name: user.name,
          password: userData.password,
          role: user.role,
          message: `User ${user.email} created/updated successfully`,
        });
        
        console.log(`✅ User ${user.email} initialized with password`);
      } catch (error: any) {
        console.error(`❌ Error creating user ${userData.email}:`, error);
        results.push({
          success: false,
          email: userData.email,
          error: error?.message || 'Unknown error',
        });
      }
    }

    // Return HTML for easy viewing in browser
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>User Setup Results</title>
        <style>
          body { font-family: system-ui; max-width: 800px; margin: 50px auto; padding: 20px; }
          .success { color: green; background: #e8f5e9; padding: 15px; margin: 10px 0; border-radius: 8px; }
          .error { color: red; background: #ffebee; padding: 15px; margin: 10px 0; border-radius: 8px; }
          .credentials { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .user { margin: 15px 0; padding: 15px; background: white; border-radius: 6px; }
          code { background: #e3f2fd; padding: 2px 6px; border-radius: 3px; font-size: 14px; }
          h1 { color: #1976d2; }
          .login-btn { 
            display: inline-block; 
            background: #1976d2; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <h1>✅ User Setup Complete</h1>
        <div class="credentials">
          <h2>User Credentials</h2>
          ${results.map(r => r.success ? `
            <div class="user success">
              <strong>${r.name}</strong><br>
              Email: <code>${r.email}</code><br>
              Password: <code>${r.password}</code><br>
              Role: <code>${r.role}</code><br>
              Status: ✅ ${r.message}
            </div>
          ` : `
            <div class="user error">
              Email: <code>${r.email}</code><br>
              Error: ${r.error}
            </div>
          `).join('')}
        </div>
        <div class="credentials">
          <h2>Login Instructions</h2>
          <p>Users can now login at:</p>
          <p><strong>https://fusion.summitmarinedevelopment.com/auth/login</strong></p>
          <p>Using either:</p>
          <ul>
            <li><strong>Password Login:</strong> Use the email and password shown above</li>
            <li><strong>Magic Link:</strong> Enter email to receive a secure login link</li>
          </ul>
          <a href="https://fusion.summitmarinedevelopment.com/auth/login" class="login-btn">Go to Login Page</a>
        </div>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err: any) {
    console.error("Init users failed:", err);
    return NextResponse.json({ 
      error: "internal_server_error", 
      detail: String(err?.message || err),
      message: "Failed to initialize users. Check server logs."
    }, { status: 500 });
  }
}

// Also support POST for programmatic access
export async function POST(request: NextRequest) {
  return GET(request);
}
