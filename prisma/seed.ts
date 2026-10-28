import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "vchristando125@gmail.com";

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log("Admin sudah ada.");
    return;
  }

  const hashedPassword = await bcrypt.hash("naruto1000", 10);

  await prisma.user.create({
    data: {
      username: "admin",
      email: email,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("Admin berhasil dibuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });