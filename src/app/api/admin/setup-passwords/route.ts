import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Check for admin token
    const tokenHeader = request.headers.get("x-admin-token");
    const tokenEnv = process.env.ADMIN_SEED_TOKEN || "";
    
    if (tokenEnv && tokenHeader !== tokenEnv) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    // User accounts to set up
    const users = [
      {
        email: 'jose@summitmarinedevelopment.com',
        name: 'Jose Morales',
        password: 'Summit2025!Marine',
        role: Role.ADMIN,
      },
      {
        email: 'kirk@zincdigital.co',
        name: 'Kirk',
        password: 'Zinc2025!Digital',
        role: Role.ADMIN,
      },
    ];

    const results = [];

    for (const userData of users) {
      try {
        // Hash the password
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
        });
      } catch (error: any) {
        results.push({
          success: false,
          email: userData.email,
          error: error?.message || 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      ok: true,
      message: 'User setup complete',
      results,
      loginInstructions: {
        url: 'https://fusion.summitmarinedevelopment.com/auth/login',
        methods: [
          'Password Login - Use email and password provided',
          'Magic Link - Enter email to receive login link',
        ],
      },
    });
  } catch (err: any) {
    console.error("Setup passwords failed:", err);
    return NextResponse.json({ 
      error: "internal_server_error", 
      detail: String(err?.message || err) 
    }, { status: 500 });
  }
}
