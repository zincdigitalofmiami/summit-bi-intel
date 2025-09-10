import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "jose@summitmarinedevelopment.com" },
    create: {
      email: "jose@summitmarinedevelopment.com",
      name: "Jose Morales",
      role: Role.ADMIN,
      onboarded: false,
    },
    update: { role: Role.ADMIN },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


