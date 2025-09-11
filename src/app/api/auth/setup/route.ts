import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export const runtime = "nodejs";

// Emergency setup endpoint - creates users and logs them in
export async function POST(request: NextRequest) {
  try {
    const { email, password, setupKey } = await request.json();
    
    // Validate setup key if configured
    const setupKeyEnv = process.env.SETUP_KEY || process.env.ADMIN_SEED_TOKEN || "";
    if (setupKeyEnv && setupKey !== setupKeyEnv) {
      return NextResponse.json({ error: "Invalid setup key" }, { status: 401 });
    }
    
    // Define allowed users with their default passwords
    const allowedUsers = {
      'jose@summitmarinedevelopment.com': {
        name: 'Jose Morales',
        defaultPassword: 'SummitMarine2025!',
        role: Role.ADMIN,
      },
      'kirk@zincdigital.co': {
        name: 'Kirk',
        defaultPassword: 'ZincDigital2025!',
        role: Role.ADMIN,
      },
    };
    
    // Check if this is an allowed user
    const userConfig = allowedUsers[email as keyof typeof allowedUsers];
    if (!userConfig) {
      return NextResponse.json({ error: "User not allowed" }, { status: 403 });
    }
    
    // Verify password matches the default
    if (password !== userConfig.defaultPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create or update the user
    const user = await prisma.user.upsert({
      where: { email },
      create: {
        email,
        name: userConfig.name,
        passwordHash,
        role: userConfig.role,
        onboarded: true,
      },
      update: {
        passwordHash,
        lastLoginAt: new Date(),
      },
    });
    
    // Create JWT token and log them in
    const secret = process.env.JWT_SECRET || "dev_secret_change_me";
    const token = jwt.sign({ sub: user.email, role: user.role }, secret, { expiresIn: "30d" });
    
    const res = NextResponse.json({ 
      ok: true,
      message: "User created/updated and logged in successfully",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
    
    res.cookies.set("auth", token, { 
      httpOnly: true, 
      sameSite: "lax", 
      secure: true, 
      path: "/", 
      maxAge: 60 * 60 * 24 * 30 
    });
    
    return res;
  } catch (err: any) {
    console.error("Setup auth failed:", err);
    return NextResponse.json({ 
      error: "Setup failed", 
      detail: err?.message 
    }, { status: 500 });
  }
}
