#!/usr/bin/env tsx
/**
 * Script to create/update users with passwords
 * Run with: npx tsx scripts/setup-users.ts
 */

import bcrypt from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function setupUsers() {
  console.log('🔧 Setting up user accounts...\n');

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

      console.log(`✅ User created/updated:`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Password: ${userData.password}`);
      console.log(`   Role: ${user.role}`);
      console.log('');
    } catch (error) {
      console.error(`❌ Error creating user ${userData.email}:`, error);
    }
  }

  console.log('\n📝 Login Instructions:');
  console.log('------------------------');
  console.log('Users can login using either:');
  console.log('1. Magic Link (passwordless) - Enter email and receive login link');
  console.log('2. Password Login - Use email and password shown above');
  console.log('\n🔗 Login URL: https://fusion.summitmarinedevelopment.com/auth/login');
  
  await prisma.$disconnect();
}

setupUsers().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
