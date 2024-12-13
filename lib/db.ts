import { PrismaClient } from '@prisma/client';

declare global{
    // eslint-disable-next-line no-var
    var prisma:PrismaClient | undefined;
}


const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db; // Store the instance in globalThis for non-production environments
}

export default db;