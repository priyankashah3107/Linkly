// this approach ensure only one instance of PrismaClient is created and reused accross your application, preventing
// the creation of multiple instances during development hot reloads. It creates a single PrismaClient and save it on the globalThis object reusing it if it already exist

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use `globalThis` properly to store Prisma instance
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Ensure only one Prisma instance is created
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
