import { PrismaClient } from '@prisma/client';

// Create Prisma client with connection pooling
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Test initial connection
prisma.$connect()
  .then(() => {
    console.log('✅ Supabase database connected successfully');
  })
  .catch((err) => {
    console.error('❌ Failed to connect to Supabase database:', err.message);
  });

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
