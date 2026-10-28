import { prisma } from "@/lib/prisma";

export async function checkMaintenance() {
  const setting = await prisma.setting.findUnique({
    where: {
      id: 1,
    },
    select: {
      maintenance: true,
    },
  });

  return setting?.maintenance ?? false;
}