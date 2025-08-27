// lib/db.ts - Enhanced Prisma client
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"],
    // Connection pool settings
    datasources: {
      db: {
        url: process.env.DATABASE_URL + `&maxPoolSize=20&minPoolSize=5`,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
