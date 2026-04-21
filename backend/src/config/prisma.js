import { PrismaClient } from '@prisma/client';

// Create Prisma client with connection pooling and retry logic
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Database connection retry logic
let retryCount = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

async function connectWithRetry() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    retryCount = 0; // Reset retry count on successful connection
  } catch (error) {
    retryCount++;
    console.error(`❌ Database connection failed (attempt ${retryCount}/${MAX_RETRIES})`);
    
    if (retryCount < MAX_RETRIES) {
      console.log(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds... (Neon database may be waking up)`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return connectWithRetry();
    } else {
      console.error('❌ Max retries reached. Database connection failed.');
      throw error;
    }
  }
}

// Initial connection with retry
connectWithRetry().catch(err => {
  console.error('Failed to connect to database:', err);
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

// Middleware to handle connection errors and auto-retry
prisma.$use(async (params, next) => {
  try {
    return await next(params);
  } catch (error) {
    // Check if it's a connection error
    if (error.code === 'P1001' || error.message?.includes("Can't reach database")) {
      console.log('🔄 Database connection lost. Attempting to reconnect...');
      
      // Try to reconnect
      await connectWithRetry();
      
      // Retry the original query
      return await next(params);
    }
    throw error;
  }
});

export default prisma;
